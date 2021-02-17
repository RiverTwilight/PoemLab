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
  openid: string;
  nickname: string;
  ownRoom: {
    roomId: string
  }[]
}

interface IRoomPost {
  // 所有者
  _openid: string;
  content: {
    type: 1 | 2,
    text: string
  }[]
}

interface IRoomConfig extends IRoomPost {
  _id: string;
  roomName: string;
  memberNum: number;
  description: string;
  posts: IRoomPost[]
}

