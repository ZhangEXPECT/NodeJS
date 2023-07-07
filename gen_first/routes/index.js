var express = require('express');
var router = express.Router();


// 导入lowdb
const low = require('lowdb');
const File = require('lowdb/adapters/FileSync');
const adapter = new File(__dirname + '/../data/db.json');
const db = low(adapter);

const shortid = require('shortid');

router.get('/account', function (req, res, next) {
  res.send('list');
});

router.get('/account/create', function (req, res, next) {
  //  db.set('user',[]).write();
  let id = shortid.generate();
  // db.get('user').push({id:id name: 'EXPECT', 'age': 18 }).write();
  res.send('create');
  // db.get('user').push({name:'EXPECT','age':18}).write();
  // db.defaults({ posts: [], user: {} }).write()

  //写入数据
  // db.get('posts').push({id: 2, title: '今天天气还不错~~'}).write();
  // db.get('posts').unshift({id: 3, title: '今天天气还不错~~'}).write();
  //获取单条数据
  // let res = db.get('posts').find({id: 1}).value();
  // console.log(res);

  //获取数据
  // console.log(db.get('posts').value());

  //删除数据
  // let res = db.get('posts').remove({id: 2}).write();
  // console.log(res);

  //更新数据
  // db.get('posts').find({id: 1}).assign({title: '今天下雨啦!!!'}).write();
});



/**
 * lowdb  轻量级的本地json数据库，以文件形式存储数据
 * 
 * shortid 自动生成id
 */

module.exports = router;
