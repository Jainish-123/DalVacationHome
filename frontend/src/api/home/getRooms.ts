import { getRequest } from "../axios";

export interface Room {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getRooms = () => {
  return getRequest<Array<Room>>("https://jsonplaceholder.typicode.com/todos");
};
