// import { getRequest } from "../axios";
import Room from "../interfaces/Room";

export const getRooms = async (): Promise<Room[]> => {
  // return getRequest<Array<Room>>("https://jsonplaceholder.typicode.com/todos");
  return [
    {
      id: 1,
      image: "/path/to/image1.jpg",
      roomNumber: "VR-3366",
      price: "$100",
      rating: 4.97,
      location: "halifax",
      beds: 4,
      guests: 6,
      baths: 3,
    },
    {
      id: 2,
      image: "/path/to/image2.jpg",
      roomNumber: "VR-3367",
      price: "$170",
      rating: 4.5,
      location: "halifax",
      beds: 6,
      guests: 6,
      baths: 3,
    },
  ];
};
