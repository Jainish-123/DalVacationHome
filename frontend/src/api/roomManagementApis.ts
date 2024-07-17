import Room from "../interfaces/Room";

export const getRooms = async (): Promise<Room[]> => {
  return [
    {
      room_id: "1",
      Agent: 1,
      Address: "123 Main St",
      Amenities: ["Wifi", "Parking"],
      Availability: "Available",
      Beds: 4,
      room: "VR-3366",
      Price: 100,
    },
    {
      room_id: "2",
      Agent: 2,
      Address: "456 Elm St",
      Amenities: ["Pool", "Gym"],
      Availability: "Available",
      Beds: 6,
      room: "VR-3367",
      Price: 170,
    },
  ];
};

export const getRoomById = async (roomId: string): Promise<Room> => {
  const data = {
    room_id: "1",
    Agent: 1,
    Address: "123 Main St",
    Amenities: ["Wifi", "Parking"],
    Availability: "Available",
    Beds: 4,
    room: "VR-3366",
    Price: 100,
  };
  return data;
};
