import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createMessage, getMessages, Message } from "../../api/queriesApi";
import { toast } from "react-toastify";

/**
 * Author: Ketul Patel
 * This component renders messaging inbox for customer and agent where they can chat with each other
 * @returns
 */
export const Messaging = () => {
  const params = useParams();

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const userId = "123";
  useEffect(() => {
    const _init = async () => {
      setMessages(
        (await getMessages(params.customerId || "", params.agentId || "")).data
      );
    };

    if (params) {
      _init();
    }
  }, [params]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        message: newMessage,
        agentId: params.agentId,
        customerId: params.customerId,
      };
      createMessage(newMsg);
      setMessages([...messages, newMsg]);
      toast("Message send successfully", {
        type: "success",
      });
      setNewMessage("");
      scrollToBottom();
    }
  };

  return (
    <div>
      <h1 className='my-2'>Messaging</h1>
      <div className='flex items-center justify-center'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg z-10 shadow-md'>
          <div
            className='flex flex-col space-y-4 h-96 overflow-y-auto'
            id='messagesContainer'
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-2 ${
                  msg.customerId === userId || msg.agentId === userId
                    ? "self-start"
                    : "self-end"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.customerId === userId || msg.agentId === userId
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <div>{msg.message}</div>
                  <div className='flex flex-row'>
                    <div className='text-xs text-gray-500 pr-1'>
                      {msg.customerId === userId || msg.agentId === userId
                        ? "You"
                        : msg.customerId === userId
                        ? msg.agentId
                        : msg.customerId}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {msg?.date
                        ? new Date(msg.date).toLocaleString()
                        : new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='mt-4'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Type your message...'
            />
            <button
              onClick={handleSend}
              className='w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none'
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
