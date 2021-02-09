import axios from "axios";
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

const instance = axios.create({
  baseURL: "https://gitee.com/api/v5/repos",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
