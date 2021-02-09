import axios from "axios";

const instance = axios.create({
  baseURL: "https://gitee.com/api/v5/repos/rivertwilight/PoemBank/issue",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
