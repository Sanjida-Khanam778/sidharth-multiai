import React from "react";

export default function Sidebar({
  chatHistory,
  handleNewChat,
  setCurrentChat,
}) {
  return (
    <div className="w-2/12 bg-gray-100 border-r border-gray-200 flex flex-col">
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
                  onClick={() => setCurrentChat(chat)}
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
