import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import profile from "../assets/images/profile.png";
import botProfile from "../assets/images/robot.png";

import {
  useGetChatMessagesQuery,
  useChatMutation,
  useGetChatSessionsQuery,
} from "../Api/authapi";

// Component for existing chat session (with session ID)
export default function SessionDashboard() {
  const { sessionId } = useOutletContext();
  const [message, setMessage] = useState("");
  const [chat, { isLoading: sendingMessage }] = useChatMutation();
  const messagesEndRef = useRef(null);

  // Fetch chat messages for current session
  const {
    data: messagesData,
    isLoading: messagesLoading,
    refetch,
  } = useGetChatMessagesQuery(sessionId, {
    skip: !sessionId,
  });

  // Get sessions query to trigger refetch
  const { refetch: refetchSessions } = useGetChatSessionsQuery();

  console.log("messagesData", messagesData?.sessions);

  const [chatMessages, setChatMessages] = useState([]);

  // Function to format response text
  const formatResponseText = (text) => {
    if (!text) return "";

    // Replace markdown headers with styled divs
    let formattedText = text
      // Handle #### headers (h4) - must come first to avoid conflicts
      .replace(
        /^####\s+(.+)$/gm,
        '<div class="text-sm font-bold text-gray-900 mb-1 mt-2">$1</div>'
      )
      // Handle ### headers (h3)
      .replace(
        /^###\s+(.+)$/gm,
        '<div class="text-md font-bold text-gray-900 mb-2 mt-3">$1</div>'
      )
      // Handle ## headers (h2)
      .replace(
        /^##\s+(.+)$/gm,
        '<div class="text-lg font-bold text-gray-900 mb-2 mt-4">$1</div>'
      )
      // Handle # headers (h1) - must come last to avoid conflicts
      .replace(
        /^#\s+(.+)$/gm,
        '<div class="text-xl font-bold text-gray-900 mb-3 mt-4">$1</div>'
      )
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      // Format links to be blue and clickable
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
      )
      .replace(/\n/g, "<br>");

    return formattedText;
  };

  // Load previous messages when sessionId changes
  useEffect(() => {
    if (messagesData?.conversations) {
      const allMessages = [];

      // Process all conversations and their messages
      messagesData.conversations.forEach((conversation) => {
        conversation.messages.forEach((msg) => {
          if (msg.role === "user") {
            allMessages.push({
              type: "user",
              content: msg.content,
            });
          } else if (msg.role === "assistant") {
            // Handle assistant messages with content_multiple
            if (msg.content_multiple) {
              const sources = [];

              // Extract all model responses from content_multiple
              Object.keys(msg.content_multiple).forEach((key) => {
                if (key.startsWith("content_") && msg.content_multiple[key]) {
                  const modelName = key.replace("content_", "");
                  sources.push({
                    name:
                      modelName.charAt(0).toUpperCase() + modelName.slice(1),
                    data: { content: msg.content_multiple[key] },
                  });
                }
              });

              allMessages.push({
                type: "assistant",
                content: { sources },
              });
            } else if (msg.content) {
              // Fallback for single content
              allMessages.push({
                type: "assistant",
                content: {
                  sources: [
                    {
                      name: "Assistant",
                      data: { content: msg.content },
                    },
                  ],
                },
              });
            }
          }
        });
      });

      setChatMessages(allMessages);
    }
  }, [messagesData]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && sessionId) {
      const userMessage = message.trim();

      // Add user message immediately to UI (optimistic update)
      setChatMessages((prev) => [
        ...prev,
        { type: "user", content: userMessage },
      ]);

      // Clear the input immediately
      setMessage("");

      try {
        // For existing session, send both input_text and session_id
        await chat({
          input_text: userMessage,
          session_id: sessionId,
        }).unwrap();

        // Refetch messages to get the updated conversation with assistant response
        refetch();
        // Also refetch sessions to update sidebar
        refetchSessions();
      } catch (err) {
        console.error("Failed to send message:", err);
        // Remove the optimistic user message if there was an error
        setChatMessages((prev) =>
          prev.filter(
            (msg) => !(msg.type === "user" && msg.content === userMessage)
          )
        );
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header with Hamburger Menu */}
      <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
        <button className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messagesLoading && sessionId ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading chat history...</span>
          </div>
        ) : (
          <>
            {chatMessages?.map((msg, index) => (
              <div key={index}>
                {msg.type === "user" ? (
                  <div className="flex justify-end mb-4">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl max-w-md">
                      {msg.content}
                    </div>
                    <div className=" w-8 h-8 my-auto rounded-full ml-3">
                      <img
                        src={profile}
                        alt="profile"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        {msg.content.sources.map((source, sourceIndex) => (
                          <div key={sourceIndex} className="p-4">
                            <div className="font-semibold text-gray-900 mb-2">
                              {source.name}
                            </div>
                            <div
                              className={`space-y-2 text-sm text-gray-700 ${
                                msg.loading ? "animate-pulse" : ""
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: formatResponseText(source.data.content),
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Invisible div for scrolling to bottom */}
        <div ref={messagesEndRef} />

        {sendingMessage && (
          <div className="flex items-start space-x-3 mb-6">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="font-semibold text-gray-900 mb-2">
                    Assistant
                  </div>
                  <div className="space-y-2 text-sm text-gray-700 whitespace-pre-line animate-pulse">
                    Thinking...
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input - Enabled for session pages */}
      <div className="border-t border-gray-200 p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-3"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={sendingMessage}
            />
          </div>
          <button
            type="submit"
            className={`p-3 rounded-full transition-colors ${
              sendingMessage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900 text-white"
            }`}
            disabled={sendingMessage}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
