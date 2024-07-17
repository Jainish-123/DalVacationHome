import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Room from "../../interfaces/Room";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import image from "../../images/room.jpg";
import { getRoomById } from "../../api/roomManagementApis";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) {
        navigate("/");
        return;
      }
      const roomData = await getRoomById(roomId);
      setRoom(roomData);
    };
    fetchRoomDetails();
  }, [roomId, navigate]);

  const handleBookNow = async () => {
    const requestBody = {
      email: "krishnavaibhav.y@gmail.com",
      room_id: "103",
    };

    try {
      const response = await fetch(
        "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // Handle success
        // For example, show a success message or navigate to a success page
      } else {
        // Handle error
        // For example, show an error message or log the error
      }
    } catch (error) {
      // Handle error
      // For example, show an error message or log the error
    }
  };

  if (!room) return <div>Loading...</div>;

  return (
    <Card className="max-w-2xl mx-auto my-8 p-4">
      <CardMedia component="img" height="300" image={image} alt={room.room} />
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {room.room}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: ${room.Price}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Agent ID: {room.Agent}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Address: {room.Address}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Availability: {room.Availability}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Beds: {room.Beds}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Amenities:
        </Typography>
        <div className="text-center">
          {room.Amenities.map((amenity, index) => (
            <div key={index} className="text-lg">
              {amenity}
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomDetails;
