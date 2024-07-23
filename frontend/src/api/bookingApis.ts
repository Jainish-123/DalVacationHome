import Booking from "../interfaces/Booking";
import { postRequest } from "./axios";

export const getBookingsByUser = async (userId: number): Promise<Booking[]> => {
  const data = [
    {
      room: "1",
      booking_id: "1",
      room_name: "VR-3366",
      booking_date: new Date().toLocaleDateString(),
    },
    {
      room: "1",
      booking_id: "2",
      room_name: "VR-3366",
      booking_date: new Date().toLocaleDateString(),
    },
    {
      room: "1",
      booking_id: "3",
      room_name: "VR-3366",
      booking_date: new Date().toLocaleDateString(),
    },
  ];
  return data;
};

//to-do booking

export const storeFeedback = (
  room: string,
  feedback: string,
  customerId: number | undefined,
  bookingId: string
) => {
  return postRequest<any>(
    "https://ilybtngf56.execute-api.us-east-2.amazonaws.com/dev/booking/store-feedback",
    {
      customerId: customerId,
      bookingId: bookingId,
      feedback: feedback,
      room: room,
    }
  );
};
