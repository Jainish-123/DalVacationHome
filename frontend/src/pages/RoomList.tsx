import { useEffect, useState } from "react"
import Room from "../interfaces/Room"
import { getRooms } from "../api/getRooms";
import RoomCard from "../components/RoomCard";
import { Grid } from "@mui/material";

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const getRoomList = async () => {
            const res = await getRooms();
            setRooms(res);
        }
        getRoomList();
    }
        , [])
    console.log(rooms);
    return (
        <Grid container spacing={2}>
            {rooms.map(room => (
                <Grid item xs={12} sm={6} md={4} key={room.id}>
                    <RoomCard room={room} />
                </Grid>
            ))}
        </Grid>
    )
}

export default RoomList;