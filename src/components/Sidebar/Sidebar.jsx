import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetChatSessionsQuery } from "../../Api/authapi";

export default function Sidebar() {
  const navigate = useNavigate();

  // Fetch chat sessions
  const { data: sessionsData, isLoading: sessionsLoading } =
    useGetChatSessionsQuery();
  console.log(sessionsData);

  // Function to organize sessions by date
  const organizeSessionsByDate = (sessions) => {
    if (!sessions) return {};

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const organized = {
      Today: [],
      Yesterday: [],
      "Last Week": [],
      "Last Month": [],
    };

    sessions.forEach((session) => {
      const sessionDate = new Date(session.created_at);
      const sessionInfo = {
        id: session.session_id,
        title: session.title,
        totalMessages: session.total_messages,
      };

      if (sessionDate.toDateString() === today.toDateString()) {
        organized.Today.push(sessionInfo);
      } else if (sessionDate.toDateString() === yesterday.toDateString()) {
        organized.Yesterday.push(sessionInfo);
      } else if (sessionDate >= lastWeek && sessionDate < yesterday) {
        organized["Last Week"].push(sessionInfo);
      } else if (sessionDate >= lastMonth && sessionDate < lastWeek) {
        organized["Last Month"].push(sessionInfo);
      }
    });

    // Remove empty categories
    Object.keys(organized).forEach((key) => {
      if (organized[key].length === 0) {
        delete organized[key];
      }
    });

    return organized;
  };

  const chatHistory = organizeSessionsByDate(sessionsData?.sessions);

  // Function to handle chat history item click
  const handleChatHistoryClick = (sessionId) => {
    navigate(`/dashboard/${sessionId}`);
  };

  const handleNewChat = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-80 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
      {/* Header with Close Button for Mobile */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:border-b-0">
        {/* <h2 className="text-lg font-semibold text-gray-800 lg:hidden">
          Chat History
        </h2> */}
        <button
          onClick={() => {
            // Assuming onClose is passed as a prop or handled elsewhere
            // For now, we'll just close the sidebar on mobile
            // If onClose is a function, it would be called here.
          }}
          className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <span className="text-lg">+</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {sessionsLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : Object.keys(chatHistory).length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No chat history found</p>
          </div>
        ) : (
          Object.entries(chatHistory).map(([period, chats]) => (
            <div key={period} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                {period}
              </h3>
              <div className="space-y-2">
                {chats.map((chat, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleChatHistoryClick(chat.id);
                      // Close sidebar on mobile when chat is selected
                      // If onClose is a function, it would be called here.
                    }}
                    className="w-full text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-200 p-2 rounded transition-colors"
                  >
                    <div className="font-medium">{chat.title}</div>
                    <div className="text-xs text-gray-500">
                      {chat.totalMessages}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
