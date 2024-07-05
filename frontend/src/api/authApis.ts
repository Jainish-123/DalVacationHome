import { postRequest } from "./axios";
import { getRequest } from "./axios";

export interface Que {
  quesId: number;
  que: string;
}

export interface checkAnswerPayload {
  email: string;
  queId: number;
  answer: string;
  cipher_text: string;
  decrypted_text: string;
}

export interface Que {
  body: Array<Que>;
  quesId: number;
  que: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
  createdAt: string;
  queId: Array<number>;
  userId: number;
}

export interface Answers {
  email: string;
  queAns: Array<{ queId: number; answer: string }>;
}
export interface AnswersPayload {
  email: string;
  queAns: Array<{ queId: number | undefined; answer: string }>;
  key: number | undefined;
}

export interface postUserType {
  email: string;
  queAns: Array<[string]>;
  name: string;
  role: string;
}
export interface userPayload {
  email: string;
  queId: Array<number | undefined>;
  name: string;
  role: string;
}

export const checkAnswer = (payload: checkAnswerPayload) => {
  return postRequest(
    "https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/login",
    payload
  );
};

export const getOneQuestion = (id: number) => {
  return getRequest<Que>(
    `https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/login/secque?id=${id}`
  );
};

export const getQuestions = () => {
  return getRequest<Que>(
    "https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/signup/secque"
  );
};

export const getUser = (email: string) => {
  return getRequest<User>(
    `https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/login?email=${email}`
  );
};

export const postAnswers = (payload: AnswersPayload) => {
  return postRequest<Answers>(
    "https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/signup/secque",
    payload
  );
};

export const postUser = (payload: userPayload) => {
  return postRequest<postUserType>(
    "https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/signup",
    payload
  );
};
