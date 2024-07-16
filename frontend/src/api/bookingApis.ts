import Booking from "../interfaces/Booking";

export const getBookingsByUser = async (userId: number): Promise<Booking[]> => {
  const data = [
    {
      booking_id: "1",
      room_name: "VR-3366",
      booking_date: new Date().toLocaleDateString(),
    },
    {
      booking_id: "1",
      room_name: "VR-3366",
      booking_date: new Date().toLocaleDateString(),
    },
    {
      booking_id: "1",
      room_name: "VR-3366",
      booking_date: new Date().toLocaleDateString(),
    },
  ];
  return data;
};

//to-do booking

//to-do sendFeedback
