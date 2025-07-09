import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import profile from "../assets/images/profile.png";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatHistory = {
    Today: [
      "Proteins in Alzheimer's Disease",
      "Best biomarkers for lung cancer",
      "Target discovery for glioblastoma treatment",
      "Top expressed genes in liver tissues",
    ], 
    Yesterday: [
      "Proteins in Alzheimer's Disease",
      "Best biomarkers for lung cancer",
      "Target discovery for glioblastoma treatment",
      "Top expressed genes in liver tissues",
    ],
    "Last Week": [
      "Proteins in Alzheimer's Disease",
      "Best biomarkers for lung cancer",
      "Target discovery for glioblastoma treatment",
      "Top expressed genes in liver tissues",
    ],
  };
  // {
  //   type: "user",
  //   content: "What proteins are involved in Alzheimer's disease?",
  // }

  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { type: "user", content: message },
        {
          type: "assistant",
          content: {
            sources: [
              {
                name: "Casually",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  pathology:
                    "Misfolded Aβ peptides accumulate to form amyloid plaques.",
                  source:
                    "Produced from the cleavage of amyloid precursor protein (APP)",
                },
              },
              {
                name: "Xolain Data",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  pathology:
                    "Misfolded Aβ peptides accumulate to form amyloid plaques.",
                  source:
                    "Produced from the cleavage of amyloid precursor protein (APP)",
                },
              },
              {
                name: "VELDT",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  pathology:
                    "Misfolded Aβ peptides accumulate to form amyloid plaques.",
                },
              },
              {
                name: "JDCT",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  pathology:
                    "Misfolded Aβ peptides accumulate to form amyloid plaques.",
                },
              },
              {
                name: "ChatGPT",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  source:
                    "Produced from the cleavage of amyloid precursor protein (APP)",
                  source2:
                    "Produced from the cleavage of amyloid precursor protein (APP)",
                },
              },
              {
                name: "Gemini",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  pathology:
                    "Misfolded Aβ peptides accumulate to form amyloid plaques.",
                },
              },
              {
                name: "Gemini by Anthropic",
                data: {
                  role: "Forms sticky plaques outside neurons.",
                  pathology:
                    "Misfolded Aβ peptides accumulate to form amyloid plaques.",
                  source:
                    "Produced from the cleavage of amyloid precursor protein (APP)",
                },
              },
            ],
          },
        },
      ]);
      setMessage("");
    }
  };

  const handleNewChat = () => {
    console.log("Starting new chat");
    setChatMessages([]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-[89vh] bg-gray-50 relative">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block lg:relative lg:z-0 h-full border ">
        <Sidebar chatHistory={chatHistory} handleNewChat={handleNewChat} />
      </div>

      {/* Sidebar for mobile/tablet */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed z-50 h-full w-80 transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          chatHistory={chatHistory}
          handleNewChat={handleNewChat}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-10/12">
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
          {chatMessages.map((msg, index) => (
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
                        <div
                          key={sourceIndex}
                          className={`p-4 ${
                            sourceIndex !== msg.content.sources.length - 1
                              ? ""
                              : ""
                          }`}
                        >
                          <div className="font-semibold text-gray-900 mb-2">
                            {source.name}
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            {source.data.role && (
                              <div>
                                <span className="font-medium">Role:</span>{" "}
                                {source.data.role}
                              </div>
                            )}
                            {source.data.pathology && (
                              <div>
                                <span className="font-medium">Pathology:</span>{" "}
                                {source.data.pathology}
                              </div>
                            )}
                            {source.data.source && (
                              <div>
                                <span className="font-medium">Source:</span>{" "}
                                {source.data.source}
                              </div>
                            )}
                            {source.data.source2 && (
                              <div>
                                <span className="font-medium">Source:</span>{" "}
                                {source.data.source2}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
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
    </div>
  );
}
