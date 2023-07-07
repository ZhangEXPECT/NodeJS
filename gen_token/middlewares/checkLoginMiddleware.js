//检测登录的中间件
module.exports = (req, res, next) => {
  //判断
  if (!req.session.username || !req.session._id) {
    return res.redirect('/login');
  }
  next();
}