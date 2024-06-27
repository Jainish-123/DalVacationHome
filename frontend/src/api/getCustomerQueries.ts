import { getRequest } from "./axios";

export interface CustomerQuery {
  id: number;
  description: string;
  date: string;
  agent: string;
  agentId: string;
}

export const getCustomerQueries = () => {
  return getRequest<Array<CustomerQuery>>(
    "https://jsonplaceholder.typicode.com/todos"
  );
};
