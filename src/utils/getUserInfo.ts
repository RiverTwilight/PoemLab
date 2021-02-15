import axios from "./axios";

interface IResponse {
        // 用户唯一标识
        OpenID: string;            
        ownRoom: string[];
        joinedRoom: string[]
}

interface IReturn extends IResponse {
    IssueID: string
}

export default async (IssueID: number): Promise<IReturn | undefined> => {
  try {
    const response = await axios.get(`/rivertwilight/poem-bank/issues/${IssueID}`);
    console.log(response);
    return JSON.parse(response.data.body)
  } catch (error) {
    console.error(error);
  }
};
