import url from "url";

module.exports = (req, res) => {
  const { jscode } = req.query;
  const code = fetch(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APPID}&secret=${process.env.SECRET}&js_code=${jscode}&grant_type=authorization_code`
  );
  res.json({
    body: code,
    query: req.query,
    cookies: req.cookies,
  });
};
