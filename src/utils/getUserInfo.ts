import axios from "./axios";

interface IResponse {
  // 用户唯一标识
  OpenID: string;
  ownRoom: string[];
  joinedRoom: string[];
}

interface IReturn extends IResponse {
  OpenID: string;
}

export default async (OpenID: string): Promise<IReturn | undefined> => {
  try {
    const response = await axios.get(
      `/rivertwilight/poem-bank/issues/${OpenID}`
    );
    console.log(response);
    return JSON.parse(response.data.body);
  } catch (error) {
    console.error(error);
  }
};
