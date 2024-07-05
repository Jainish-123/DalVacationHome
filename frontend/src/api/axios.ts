import axios from "axios";

export const getRequest = <T>(endpoint: string) => {
  return axios.get<T>(endpoint);
};
export const postRequest = <T>(endpoint: string, body: any) => {
  return axios.post<T>(endpoint, body);
};
