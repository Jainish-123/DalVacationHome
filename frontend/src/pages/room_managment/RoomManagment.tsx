// import React, { useState, useEffect } from "react";
// // import Room from "../../interfaces/Room";
// import { getRooms } from "../../api/roomManagementApis";
// import { useNavigate } from "react-router-dom";

// export const RoomManagment = () => {
//   const [rooms, setRooms] = useState<
//     {
//       room: string;
//       Address: string;
//       Amenities: string[];
//       Availability: string;
//       Beds: number;
//       Price: number;
//     }[]
//   >([]);

//   const fetchRoomDetails = async () => {
//     try {
//       const response = await fetch(
//         "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room/get",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ agent: "Raj Wick" }),
//         }
//       );
//       const data = await response.json();
//       setRooms(data);
//       console.log("Room details fetched successfully:", data);
//     } catch (error) {
//       console.error("Error fetching room details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRoomDetails();
//   }, []);
//   const handleDelete = async (id: number) => {
//     // Delete logic here
//   };

//   const handleEdit = (id: number) => {
//     // Edit logic here
//   };

//   const navigate = useNavigate();

//   const handleAddRoom = () => {
//     navigate("/room-managment/add");
//   };

//   return (
//     <div>
//       <div className="container">
//         <table className="my-5 table table-striped container">
//           <thead>
//             <tr>
//               <th>Agent</th>
//               <th>Address</th>
//               <th>Amenities</th>
//               <th>Availability</th>
//               <th>Beds</th>
//               <th>Room</th>
//               <th>Price</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.map((room, index) => (
//               <tr key={index}>
//                 <td>{room.room}</td>
//                 <td>{room.Address}</td>
//                 <td>{room.Amenities.join(", ")}</td>
//                 <td>{room.Availability}</td>
//                 <td>{room.Beds}</td>
//                 <td>{room.Price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <button className="btn btn-primary" onClick={handleAddRoom}>
//           Add Room
//         </button>
//       </div>
//     </div>
//   );
// };

// import Room from "../../interfaces/Room";
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
              agent: "Raj Wick",
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
  const handleEdit = (room: string) => {};

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
                <td>{room.Amenities.join(", ")}</td>
                <td>{room.Availability}</td>
                <td>{room.Beds}</td>
                <td>{room.Price}</td>
                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => handleEdit(room.room)}
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
