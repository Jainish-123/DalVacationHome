import { getRequest, postRequest } from "./axios";

export interface Query {
  id: string;
  description: string;
  date: string;
  agentId: string;
  customerId: string;
  bookingId: string;
}

export interface Message {
  id?: string;
  message: string;
  date?: string;
  agentId?: string;
  customerId?: string;
}

const QUERIES_ENDPOINT =
  "https://y83o35anx0.execute-api.us-east-1.amazonaws.com/";

export const getAgentQueries = (agentId: string) => {
  return getRequest<Array<Query>>(
    QUERIES_ENDPOINT + "agent-queries/" + agentId
  );
};

export const getCustomerQueries = (customerId: string) => {
  return getRequest<Array<Query>>(
    QUERIES_ENDPOINT + "customer-queries/" + customerId
  );
};

export const postMessage = (message: string) => {
  return postRequest<any>(
    "https://us-central1-serverless-426912.cloudfunctions.net/post-customer-query",
    {
      customerId: "123",
      bookingId: "123",
      message: message,
    }
  );
};

export const getMessages = (customerId: string, agentId: string) => {
  return getRequest<Array<Message>>(
    QUERIES_ENDPOINT + "messages/" + customerId + "/" + agentId
  );
};

export const createMessage = (message: Message) => {
  return postRequest<any>(QUERIES_ENDPOINT + "create-message", message);
};
