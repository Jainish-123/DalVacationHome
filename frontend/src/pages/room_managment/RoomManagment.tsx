import { getRooms } from "../../api/roomManagementApis";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
type Room = {
  room: string;
  Address: string;
  Amenities: string[];
  Availability: string;
  Beds: number;
  Price: string;
  Agent: string;
};
const RoomManagment = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Fetch the rooms data from the API
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              agent: "krishna",
            }),
          }
        );

        const data = await response.json();

        if (data.rooms) {
          setRooms(data.rooms);
        } else {
          setRooms([]);
          console.error("Rooms data is not available:", data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]); // Ensure rooms is always an array
      }
    };

    fetchRooms();
  }, []);
  const navigate = useNavigate();
  const handleAddRoom = () => {
    navigate("/room-managment/add");
  };
  const handleDelete = async (room: string) => {};

  const handleEdit = (room: Room) => {
    navigate("/room-managment/update", { state: { room } });
  };

  return (
    <div>
      <h1>Rooms List</h1>
      <table className="table table-striped container">
        <thead>
          <tr>
            <th>Room</th>
            <th>Address</th>
            <th>Amenities</th>
            <th>Availability</th>
            <th>Beds</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <tr key={index}>
                <td>{room.room}</td>
                <td>{room.Address}</td>
                <td>{room.Amenities}</td>
                <td>{room.Availability}</td>
                <td>{room.Beds}</td>
                <td>{room.Price}</td>
                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(room.room)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No rooms available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div></div>
      <button className="btn btn-primary" onClick={handleAddRoom}>
        Add Room
      </button>
    </div>
  );
};

export default RoomManagment;
