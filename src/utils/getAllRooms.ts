import axios from "./axios";

export default async (page: number = 1) => {
  try {
    const response = await axios.get(`/rivertwilight/poem-bank/issues`, {
      params: {
        lable: "RoomData",
        page,
        access_token: "a0f599af6d8377b405abaa05a56c2fb9",
        sort: "created",
        direction: "desc",
        per_page: 20,
      },
    });
    console.log(response);
    return response.data.map((room: any) => {
      const { body, updated_at, id } = room;
      return Object.assign({ updated_at, id }, JSON.parse(body));
    });
  } catch (error) {
    console.error(error);
  }
};
