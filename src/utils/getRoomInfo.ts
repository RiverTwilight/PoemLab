import axios from "./axios";

export default async ({ roomId }: { roomId: number }) => {
  try {
    const response = await axios.get(`/${roomId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
