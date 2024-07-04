import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Room from '../interfaces/Room';

interface RoomCardProps {
    room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={room.image}
                alt={room.roomNumber}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {room.roomNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {room.price}
                </Typography>
                <Button variant="contained" color="primary">
                    Book Now
                </Button>
            </CardContent>
        </Card>
    );
};

export default RoomCard;
