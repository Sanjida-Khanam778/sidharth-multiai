import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.png";
import botProfile from "../assets/images/robot.png";

import {
  useChatMutation,
  useGetChatSessionsQuery,
} from "../Api/authapi";

// Component for new chat (no session ID)
export default function Dashboard() {
  const navigate = useNavigate();
  const [chat, { isLoading }] = useChatMutation();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Get sessions query to trigger refetch
  const { refetch: refetchSessions } = useGetChatSessionsQuery();

  // Fetch user profile data for profile picture

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = message.trim();

      // Add user message immediately to UI (optimistic update)
      setChatMessages((prev) => [
        ...prev,
        { type: "user", content: userMessage },
      ]);

      // Clear the input immediately
      setMessage("");

      try {
        // For new chat, only send input_text
        const data = await chat({ input_text: userMessage }).unwrap();
        console.log(data)
        // Navigate to the session page with the session_id from response
        if (data.session_id) {
          // Refetch sessions to update sidebar
          refetchSessions();
          navigate(`/dashboard/${data.session_id}`);
          return; // Don't save the response, just navigate
        }

        // Fallback if no session_id (shouldn't happen)
        const sources = [
          { name: "Mistral", data: { content: data.responses.mistral } },
          { name: "Gemini", data: { content: data.responses.gemini } },
          { name: "Claude", data: { content: data.responses.claude } },
          { name: "ChatGPT", data: { content: data.responses.chatgpt } },
          { name: "XAI", data: { content: data.responses.xai } },
          { name: "DeepSeek", data: { content: data.responses.deepseek } },
        ];
        setChatMessages((prev) =>
          prev.concat({
            type: "assistant",
            content: { sources },
          })
        );
      } catch (err) {
        setChatMessages((prev) =>
          prev.concat({
            type: "assistant",
            content: {
              sources: [
                {
                  name: "Error",
                  data: { content: "Failed to fetch response." },
                },
              ],
            },
          })
        );
        // Remove the optimistic user message if there was an error
        setChatMessages((prev) =>
          prev.filter(
            (msg) => !(msg.type === "user" && msg.content === userMessage)
          )
        );
      }
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleSidebar = () => {
    // This function is now handled by the static sidebar
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header with Hamburger Menu */}
      <div className="bg-white border-b border-gray-200 p-4 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        >
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
        {chatMessages?.map((msg, index) => (
          <div key={index}>
            {msg.type === "user" ? (
              <div className="flex justify-end mb-4">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl max-w-md">
                  {msg.content}
                </div>
                <div className=" w-8 h-8 my-auto rounded-full ml-3">
                  <img
                    src={
                
                      profile
                    }
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-3 mb-6">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={botProfile}
                    alt="bot"
                    className="w-full h-full object-cover"
                  />
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
        {isLoading && (
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

        {/* Invisible div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
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
              placeholder="Enter your biomedical query here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition-colors"
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
