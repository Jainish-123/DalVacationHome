import { useEffect, useState } from "react";
import Room from "../interfaces/Room";
import RoomCard from "../components/RoomCard";
import { Grid, Dialog } from "@mui/material";
import { getRooms } from "../api/roomManagementApis";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRoomList = async () => {
      const res = await getRooms();
      setRooms(res);
    };
    getRoomList();
  }, []);

  const handleCardClick = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <Grid container spacing={2}>
      {rooms.map((room) => (
        <Grid item xs={12} sm={6} md={4} key={room.room_id}>
          <RoomCard room={room} onClick={() => handleCardClick(room.room_id)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
