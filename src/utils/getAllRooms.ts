import axios from "./axios";

export default async (page: number = 1) => {
  try {
    const response = await axios.get(`/`, {
      params: { lable: "RoomData", page },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
