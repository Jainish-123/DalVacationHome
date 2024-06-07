import axios from "axios";

export const getRequest = <T>(endpoint: string) => {
  return axios.get<T>(endpoint);
};
