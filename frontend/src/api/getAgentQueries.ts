import { getRequest } from "./axios";

export interface AgentQuery {
  id: number;
  description: string;
  date: string;
  customer: string;
  customerId: string;
}

export const getAgentQueries = () => {
  return getRequest<Array<AgentQuery>>(
    "https://jsonplaceholder.typicode.com/todos"
  );
};
