const axios = require("axios");
require("dotenv").config();
const adapter = require("axios/lib/adapters/http");
const MAP_ISSUEID = "I37Z1N";

/**
 *
 * @param {*} originMap
 * @param {string} openid
 */
const createUser = async (originMap, openid) => {
  console.log("Start create ");
  // 创建用户信息表
  const create = await axios({
    url: `https://gitee.com/api/v5/repos/rivertiwlight/poem-bank/issues`,
    method: "post",
    adapter,
    data: {
      body: JSON.stringify({ nickname: "river" }),
      access_token: "626a77707d77fb8ed63b8e2ecaab344e",
      title: openid,
      lable: "PersonalData",
    },
  });
  console.log(create);
  const newMap = JSON.parse(originMap);
  newMap[openid] = create.data.id;
  console.log("Update Userdata Map.");
  // 添加映射
  const response = await axios.patch(
    `https://gitee.com/api/v5/repos/rivertwilight/poem-bank/issues/${MAP_ISSUEID}`,
    {
      access_token: "626a77707d77fb8ed63b8e2ecaab344e",
      body: newMap,
    }
  );
  return create.data.id;
};

const login = async (jscode) => {
  try {
    const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APPID}&secret=${process.env.SECRET}&js_code=${jscode}&grant_type=authorization_code`;
    const code = await axios.get(api, { adapter });

    if (code.data.errmsg) {
      return {
        status: {
          code: 502,
          msg: "Wx API says:" + code.data.errmsg,
        },
      };
    }

    const { openid, session_key } = code.data;

    console.log(`✔ 1.Got Wx's auth succcessfully (openid: ${openid})`);

    const rowUserDataMap = await axios.get(
      `https://gitee.com/api/v5/repos/rivertwilight/poem-bank/issues/${MAP_ISSUEID}`,
      { adapter }
    );

    console.log(rowUserDataMap);

    const userDataMap = JSON.parse(rowUserDataMap.data.body);

    console.log(
      "✔ 2.Got UserData Map from gitee issue succcessfully",
      userDataMap
    );

    const issueid = await createUser(userDataMap, openid);

    console.log(
      `✔ 3.Create/Get UserData from gitee issue succcessfully (${issueid})`,
      userDataMap[openid]
    );

    if (openid && session_key) {
      return {
        status: {
          code: 200,
          msg: "login successfully",
        },
        openid,
        session_key,
        issueid,
      };
    }
    return {
      status: {
        code: 501,
        msg: "Unknown Error",
      },
    };
  } catch (err) {
    return {
      status: {
        code: 500,
        msg: err,
      },
    };
  }
};

export { login };
export default async (req, res) => {
  const { jscode } = req.query;
  res.json(login(jscode));
};
