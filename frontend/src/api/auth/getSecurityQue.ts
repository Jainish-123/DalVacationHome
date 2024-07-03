import { getRequest } from "../axios";

export interface Que {
  body: Array<Que>;
  quesId: number,
  que: string
}

export const getQuestions = () => {
  return getRequest<Que>("https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/signup/secque");
};
