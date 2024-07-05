import { getRequest } from "../axios";

export interface Que {
  quesId: number,
  que: string
}


export const getOneQuestion = (id: number) => {
  return getRequest<Que>(`https://ktynzoy843.execute-api.us-east-1.amazonaws.com/dev/auth/login/secque?id=${id}` );
};
