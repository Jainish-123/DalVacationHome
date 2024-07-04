import { getRequest, postRequest } from "./axios";

export interface CustomerQuery {
  id: number;
  description: string;
  date: string;
  agent: string;
  agentId: string;
}

export interface AgentQuery {
  id: number;
  description: string;
  date: string;
  customer: string;
  customerId: string;
}

const QUERIES_ENDPOINT =
  "https://y83o35anx0.execute-api.us-east-1.amazonaws.com/";

export const getAgentQueries = (agentId: string) => {
  return getRequest<Array<AgentQuery>>(
    QUERIES_ENDPOINT + "agent-queries/" + agentId
  );
};

export const getCustomerQueries = (customerId: string) => {
  return getRequest<Array<CustomerQuery>>(
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
