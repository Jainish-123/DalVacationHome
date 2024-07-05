import { postRequest } from "../axios";

export interface User {
    email: string,
    queAns: Array<[string]>,
    name: string,
    role: string,   
}
export interface userPayload {
    email: string,
    queId: Array<number | undefined>,
    name: string,
    role: string,
    }

export const postUser = (payload: userPayload) => {
    console.log("postUser payload", payload);
  return postRequest<User>("https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/signup", payload);
};
