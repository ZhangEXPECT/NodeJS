var express = require('express');
var router = express.Router();

//导入 moment
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

// 声明检测登录中间件
// let checkLogin = require('../middlewares/checkLogin');

//测试
// console.log(moment('2023-02-24').toDate())
//格式化日期对象
// console.log(moment(new Date()).format('YYYY-MM-DD'));



// 编写api注释、执行apidoc  -i routes/ -o public/apidoc/
/**
 * 
 * @api {get} /account 账单列表
 * @apiName 账单列表
 * @apiGroup 用户
 * @apiDescription 返回用户账单列表
 * @apiVersion  0.1.0 
 * @apiSuccess {Number} code 200
 * @apiSuccess {Object} data 账单列表信息
 * @apiSuccessExample {type} Response-Example:
 * {
 *  code: 200,
 *  data: [{
 *    title: '',
 *    time: '',
 *    type: '',
 *    account:'',.
 * 
 *    remarks:''’
 *  }]
 * }
 * 
 */


//记账本的列表
router.get('/', function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  //读取集合信息
  AccountModel.find().sort({ time: -1 }).exec().then(data => {
    res.render('list', { accounts: data, moment: moment });
  }).catch(err => {
    res.status(500).send(`读取失败~ ${err}`);
  })
});

//添加记录
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account', (req, res) => {
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }).then(data => {
    res.render('success', { msg: '添加成功哦~~~', url: '/' });
  }).catch(err => {
    res.status(500).send(`插入失败~ ${err}`);
  })
});

//删除记录
router.get('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({ _id: id }).exec().then(data => {
    //提醒
    res.render('success', { msg: '删除成功~~~', url: '/' });
  }).catch(err => {
    res.status(500).send(`删除失败~ ${err}`);
  })
});

module.exports = router;
