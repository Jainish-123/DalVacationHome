import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message, getMessages } from "../../api/getMessages";

export const Messaging = () => {
  const params = useParams();

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const _init = async () => {
      setMessages(getMessages(params.customerId || "", params.agentId || ""));
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
        id: (messages.length + 1).toString(),
        message: newMessage,
        date: new Date().toISOString(),
        agent: "Agent", // Or the name of the current agent
        customer: "Customer", // Or the name of the current customer
        owner: true,
      };
      setMessages([...messages, newMsg]);
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
                  msg.owner ? "self-start" : "self-end"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    msg.owner
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <div>{msg.message}</div>
                  <div className='flex flex-row'>
                    <div className='text-xs text-gray-500 pr-1'>
                      {msg.owner ? "You" : msg.agent || msg.customer}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {new Date(msg.date).toLocaleString()}
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
