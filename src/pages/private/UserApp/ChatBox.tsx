import React, { useCallback, useEffect, useState } from "react";
import { Send, Star, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { toast } from "sonner";
import { User } from "../../../interfaces/models";

interface Message {
  id: string;
  text: string;
  sender: "user" | "instructor";
  timestamp: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  rating?: string;
  reviews?: number;
  isOnline?: boolean;
  isSelected?: boolean;
  [key: string]: any;
}

const ChatBox: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello Sarah! I hope you're ready for today's lesson. We'll be focusing on parallel parking techniques.",
      sender: "instructor",
      timestamp: "9:00 AM",
    },
    {
      id: "2",
      text: "Hi Michael! Yes, I'm looking forward to it. I've been practicing the techniques you showed me last time.",
      sender: "user",
      timestamp: "9:02 AM",
    },
    {
      id: "3",
      text: "That's great to hear! We'll start with a quick review and then move on to more advanced techniques.",
      sender: "instructor",
      timestamp: "9:05 AM",
    },
  ]);
  const getMessages = useCallback(async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/get-msgs-of-chat",
      {
        senderId: user?.id,
        receiverId: selectedUser?.id,
        senderType: "STUDENT",
        receiverType: "TEACHER",
      },
    );
    if (!response.data.success) {
      toast.error("Failed to get messages");
    } else {
      setMessages(response.data.chat || []);
    }
  }, [user?.id, selectedUser]);

  const [chatUsers, setChatUsers] = useState<ChatUser[]>([
    {
      id: "1",
      name: "Michael Anderson",
      avatar:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/dc19ab59cc2ce27074217da3c8ec644b.png",
      rating: "4.8",
      reviews: 124,
      isOnline: true,
      isSelected: true,
    },
    {
      id: "2",
      name: "Hari",
      avatar:
        "https://image-resource.creatie.ai/155238777211102/155238777211104/d40d71fe21bcf9e0d8077624487b2244.png",
      isOnline: true,
    },
  ]);
  const getChatUser = useCallback(async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/get-chat-user",
      {
        id: user?.id,
      },
    );
    if (!response.data.success) {
      toast.error("Failed to get chat user");
    } else {
      setChatUsers(response.data.users || []);
    }
  }, [chatUsers]);
  useEffect(() => {
    getChatUser();
  }, [getChatUser]);
  useEffect(() => {
    if (selectedUser) {
      getMessages();
    }
  }, [selectedUser, getMessages]);
  // const handleRoomJoin = async (id:string) => {
  //   // Logic to join the chat room with the selected user
  // };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Chat List Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 right-0 lg:left-0 w-72 bg-white dark:bg-gray-800 border-l lg:border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <img 
            src="https://image-resource.creatie.ai/155238777211102/155238777211104/75b3ef6bdbfeed6aa6499fc1a28b8188.png" 
            alt="Logo" 
            className="w-8 h-8"
          />
        </div> */}

        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {chatUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${
                user.isSelected
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
              onClick={() => {
                setSelectedUser(user);
                // handleRoomJoin(user.id);
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  {user.rating && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>
                        {user.rating} ({user.reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-500 dark:text-gray-400"
            >
              {sidebarOpen ? (
                <ChevronRight className="w-6 h-6" />
              ) : (
                <ChevronLeft className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={chatUsers[0].avatar}
                  alt={chatUsers[0].name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              <div>
                <h2 className="font-medium text-gray-900 dark:text-white">
                  {chatUsers[0].name}
                </h2>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>
                    {chatUsers[0].rating} ({chatUsers[0].reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-gray-900 dark:text-white"
                    : "bg-blue-50 dark:bg-blue-900/30 text-gray-900 dark:text-white"
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500"
              />
              {/* <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Plus className="w-5 h-5" />
              </button> */}
            </div>
            <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-lg flex items-center space-x-2 transition-colors">
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
