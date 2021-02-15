const axios = require("axios");

// function checkIfExist(params) {
//   return false;
// }

// function createUser(params) {
//   return false;
// }

module.exports = async (req, res) => {
  try {
    const { jscode } = req.query;
    const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APPID}&secret=${process.env.SECRET}&js_code=${jscode}&grant_type=authorization_code`;
    const code = await axios.get(api);

    console.log(api, code);

    res.json({
      body: code.data,
    });
  } catch (err) {
    console.log(err);
  }
};
