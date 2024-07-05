import { getRequest } from "../axios";

interface User {
  email: string;
  name: string;
  role: string;
  createdAt: string;
  queId: Array<number>;
  userId: number;
}

export const getUser = (email: string) => {
  return getRequest<User>(`https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/login?email=${email}` );
};
