import React, { useState, useEffect } from "react";
import Room from "../../interfaces/Room";
import { getRooms } from "../../api/getRooms";
import { useNavigate } from "react-router-dom";

export const RoomManagment = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getRoomList = async () => {
      const res = await getRooms();
      setRooms(res);
    };
    getRoomList();
  }, []);

  const handleDelete = async (id: number) => {
    // Delete logic here
  };

  const handleEdit = (id: number) => {
    // Edit logic here
  };

  const navigate = useNavigate();

  const handleAddRoom = () => {
    navigate("/room_managment/add");
  };

  return (
    <div>
      <div className="container">
        <table className="my-5 table table-striped container">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Image</th>
              <th>Room Number</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Location</th>
              <th>Beds</th>
              <th>Guests</th>
              <th>Baths</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.image}</td>
                <td>{room.roomNumber}</td>
                <td>{room.price}</td>
                <td>{room.rating}</td>
                <td>{room.location}</td>
                <td>{room.beds}</td>
                <td>{room.guests}</td>
                <td>{room.baths}</td>
                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => handleEdit(room.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleAddRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
};
