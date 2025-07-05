import React from "react";

export default function Sidebar({
  chatHistory,
  handleNewChat,
  setCurrentChat,
  onClose,
}) {
  return (
    <div className="w-80 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
      {/* Header with Close Button for Mobile */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:border-b-0">
        <h2 className="text-lg font-semibold text-gray-800 lg:hidden">
          Chat History
        </h2>
        <button
          onClick={onClose}
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
        {Object.entries(chatHistory).map(([period, chats]) => (
          <div key={period} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              {period}
            </h3>
            <div className="space-y-2">
              {chats.map((chat, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentChat(chat);
                    // Close sidebar on mobile when chat is selected
                    if (onClose) {
                      onClose();
                    }
                  }}
                  className="w-full text-left text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-200 p-2 rounded transition-colors"
                >
                  {chat}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
