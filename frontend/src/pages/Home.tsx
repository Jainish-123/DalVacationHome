import { useEffect, useState } from "react";
import { Room, getRooms } from "../api/home/getRooms";

export const Home = () => {
  const [rooms, setRooms] = useState<Array<Room>>([]);
  useEffect(() => {
    getRooms()
      .then((val) => {
        setRooms(val.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {rooms.map((item, index) => (
        <h1 key={index}>{item.title}</h1>
      ))}
    </div>
  );
};
