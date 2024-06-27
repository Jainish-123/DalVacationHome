import { getRequest } from "./axios";

export interface Message {
  id: string;
  message: string;
  date: string;
  agent?: string;
  customer?: string;
  owner: boolean;
}

export const getMessages = (customerId: string, agentId: string) => {
  const initialMessages: Message[] = [
    {
      id: "1",
      message: "Hello! How can I help you today?",
      date: "2024-06-27T12:00:00Z",
      agent: "Agent",
      owner: true,
    },
    {
      id: "2",
      message: "I need help with my order.",
      date: "2024-06-27T12:01:00Z",
      customer: "Customer",
      owner: false,
    },
  ];

  //   return getRequest<Array<Message>>(
  //     "https://jsonplaceholder.typicode.com/todos"
  //   );
  return initialMessages;
};
