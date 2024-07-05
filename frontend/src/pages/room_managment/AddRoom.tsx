import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

interface Room {
  id: number;
  image: string;
  roomNumber: string;
  price: string;
  rating: number;
  location: string;
  beds: number;
  guests: number;
  baths: number;
}

export const AddRoom = () => {
  const [room, setRoom] = useState<Room>({
    id: 0,
    image: "",
    roomNumber: "",
    price: "",
    rating: 0,
    location: "",
    beds: 0,
    guests: 0,
    baths: 0,
  });

  const handleRequest = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room",
        {
          email: "krishnavaibhav.y@gmail.com",
          room_id: "103",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoom((prevRoom: Room) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic to handle the form submission here
    console.log(room);
  };

  return (
    <div className="my-4 container">
      <h1>Add Room</h1>
      <Form className="container my-5" onSubmit={handleSubmit}>
        <Form.Group controlId="image" className="row">
          <Form.Label className="col">Image</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="image"
            value={room.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="roomNumber" className="row">
          <Form.Label className="col">Room Number</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price" className="row">
          <Form.Label className="col">Price</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="price"
            value={room.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="rating" className="row">
          <Form.Label className="col">Rating</Form.Label>
          <Form.Control
            className="col"
            type="number"
            name="rating"
            value={room.rating}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="location" className="row">
          <Form.Label className="col">Location</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="location"
            value={room.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="beds" className="row">
          <Form.Label className="col">Beds</Form.Label>
          <Form.Control
            className="col"
            type="number"
            name="beds"
            value={room.beds}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="guests" className="row">
          <Form.Label className="col">Guests</Form.Label>
          <Form.Control
            className="col"
            type="number"
            name="guests"
            value={room.guests}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="baths" className="row">
          <Form.Label className="col">Baths</Form.Label>
          <Form.Control
            className="col"
            type="number"
            name="baths"
            value={room.baths}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="my-5" variant="primary" onClick={handleRequest}>
          Add Room
        </Button>
      </Form>
    </div>
  );
};
