import axios from "./axios";

export default async (page: number = 1) => {
  try {
    const response = await axios.get(`/rivertwilight/poem-bank/issues`, {
      params: {
        lable: "RoomData",
        page,
        access_token: "626a77707d77fb8ed63b8e2ecaab344e",
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
