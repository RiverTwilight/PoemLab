declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV:
    | "weapp"
    | "swan"
    | "alipay"
    | "h5"
    | "rn"
    | "tt"
    | "quickapp"
    | "qq"
    | "jd";
  }
}

type OpenID = string;

interface roomData {
  roomName: string;
  owner: OpenID;
  joiner: OpenID[];
  contents: {
    [author: string]: {}[];
  };
}

interface userData {
  OpenID: string;
  nickname: string;
}

interface IRoomConfig {
  roomName: string;
  memberNum: number;
  posts: {
    author: string;
    content: {
      type: 1 | 2,
      text: string
    }[]
  }[];
}
