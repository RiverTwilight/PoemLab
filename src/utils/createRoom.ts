import axios from "./axios";

export default async (
  title: string,
  body: {
    owner: any;
  }
) => {
  try {
    const response = await axios.post(`/rivertwilight/issues`, {
      labels: "RoomData",
      repo: "poem-bank",
      access_token: "a0f599af6d8377b405abaa05a56c2fb9",
      title,
      body: JSON.stringify(body),
    });
    console.log(response);
    return {
      data: response.data
    }
  } catch (error) {
    console.error(error);
    return {
      code: 400
    }
  }
};
