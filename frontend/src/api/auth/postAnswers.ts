import { postRequest } from "../axios";

export interface Answers {
    email: string,
    queAns: Array<{queId: number, answer: string}>, 
}
export interface AnswersPayload {
    email: string,
    queAns: Array<{queId: number | undefined, answer: string}>, 
    key: number | undefined,
}


export const postAnswers = (payload: AnswersPayload) => {
  return postRequest<Answers>("https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/signup/secque", payload);
};
