import axios from "./axios";

export default async (IssueID: number): Promise<roomData | undefined> => {
  try {
    const response = await axios.get(
      `/rivertwilight/poem-bank/issues/${IssueID}`
    );
    console.log(response);
    return JSON.parse(response.data.body);
  } catch (error) {
    console.error(error);
  }
};
