var express = require('express');
var router = express.Router();
//导入 jwt
const jwt = require('jsonwebtoken');
//导入配置文件
const { SECRET } = require('../../config/config');
//导入 用户的模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

//登录操作
router.post('/login', (req, res) => {
  //获取用户名和密码
  let { username, password } = req.body;
  //查询数据库
  UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
    //判断
    if (err) {
      res.json({
        code: '2001',
        msg: '数据库读取失败~~~',
        data: null
      })
      return
    }
    //判断 data
    if (!data) {
      return res.json({
        code: '2002',
        msg: '用户名或密码错误~~~',
        data: null
      })
    }

    //创建当前用户的 token
    let token = jwt.sign({
      username: data.username,
      _id: data._id
    }, SECRET, {
      expiresIn: 60 * 60 * 24 * 7
    });

    //响应 token
    res.json({
      code: '200',
      msg: '登录成功',
      data: { ...data, token }
    })

    console.log(res.json)
  })

});

//退出登录
router.post('/logout', (req, res) => {
  //销毁 session
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' });
  })
});

module.exports = router;


// md5加密  md5(req.body.password); 单向加密
// router.post('register', (req, res) => {

// });
// router.post('login', (req, res) => {

//   let { username, password } = req.body;

//   UserModel.findOne({ username: username, password: md5(password) }).exec().then(res => {

//     res.render('success', { msg: '登陆成功', url: "" });

//   }).catch(err => {

//   })

// });
// 导入session的包，在app.js导入，登录成功 + 写入session
// 编写中间件对请求进行判断
// 退出清除


/**
 * 跨站请求伪造；通过在b网站获取到的用户cookie通过link、a、img等标签访问a网站，因此一些操作尽可能用post
 *
 *
 */
// router.post('logout', (req, res, next) => {

// })


/**
 * token；相比于cookie，token手动设置到请求中，且保存在用户端减轻了服务端压力， 数据加密相对安全、服务之间可以共享
 * 
 */
