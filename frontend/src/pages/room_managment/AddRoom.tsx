import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const AddRoom = () => {
  const [room, setRoom] = useState({
    agent: "",
    address: "",
    amenities: "",
    availability: "",
    beds: 0,
    room: "",
    price: 0,
  });

  const handleRequest = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room/add",
        room,
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
    setRoom((prevRoom) => ({
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
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="agent" className="row">
          <Form.Label className="col">Agent</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="agent"
            value={room.agent}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="address" className="row">
          <Form.Label className="col">Address</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="address"
            value={room.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="amenities" className="row">
          <Form.Label className="col">Amenities</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="amenities"
            value={room.amenities}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="availability" className="row">
          <Form.Label className="col">Availability</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="availability"
            value={room.availability}
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

        <Form.Group controlId="room" className="row">
          <Form.Label className="col">Room</Form.Label>
          <Form.Control
            className="col"
            type="text"
            name="room"
            value={room.room}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price" className="row">
          <Form.Label className="col">Price</Form.Label>
          <Form.Control
            className="col"
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          className="my-3"
          variant="primary"
          type="submit"
          onClick={handleRequest}
        >
          Add Room
        </Button>
      </Form>
    </div>
  );
};
