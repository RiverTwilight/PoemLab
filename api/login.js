const axios = require('axios')

function checkIfExist(params) {
  return false
}

function createUser(params) {
  return false
}

module.exports = async (req, res) => {
  const { jscode } = req.query;

  const code = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APPID}&secret=${process.env.SECRET}&js_code=${jscode}&grant_type=authorization_code`);

  res.json({
    body: code
  });
};
