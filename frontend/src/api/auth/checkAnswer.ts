import { postRequest } from "../axios";

export interface checkAnswerPayload {
    email: string,
    queId: number,
    answer: string,
    cipher_text: string,
    decrypted_text: string,
    }

export const checkAnswer = (payload: checkAnswerPayload) => {
  return postRequest("https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/login", payload);
};
