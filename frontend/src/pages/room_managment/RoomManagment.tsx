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
    navigate("/room-managment/add");
  };

  return (
    <div>
      <div className="container">
        <table className="my-5 table table-striped container">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Address</th>
              <th>Amenities</th>
              <th>Availability</th>
              <th>Beds</th>
              <th>Room</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.room}>
                <td>{room.Agent}</td>
                <td>{room.Address}</td>
                <td>{room.Amenities.join(", ")}</td>
                <td>{room.Availability}</td>
                <td>{room.Beds}</td>
                <td>{room.room}</td>
                <td>{room.Price}</td>
                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => handleEdit(Number(room.room))}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(Number(room.room))}
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

export default RoomManagment;
