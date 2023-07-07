/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = function (success, error) {
  //判断 error 为其设置默认值
  if (typeof error !== 'function') {
    error = () => {
      console.log('连接失败~~~');
    }
  }
  //1. 安装 mongoose
  //2. 导入 mongoose
  const mongoose = require('mongoose');
  //导入 配置文件
  const { DBHOST, DBPORT, DBNAME } = require('../config/config.js');

  //设置 strictQuery 为 true
  mongoose.set('strictQuery', true);

  //3. 连接 mongodb 服务                        数据库的名称
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  //4. 设置回调
  // 设置连接成功的回调  once 一次   事件回调函数只执行一次
  mongoose.connection.once('open', () => {
    success();
  });

  // 设置连接错误的回调
  mongoose.connection.on('error', () => {
    error();
  });

  //设置连接关闭的回调  // mongoose.connection.close();
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  });

}
/**
 * mongodb 分布式文件存储，数据存储为文件，数据结构为键值对
 * 
 * 一个mogodb服务下可有N个数据库(Json文件)、文件中一级属性好比集合、数组里的对象好比文档、对象属性即是字段
 * 
 * 启动mongodb   mongod  
 * 
 * 连接本地的mongodb服务   mongosh
 * 
 * 查看数据库 showdbs 
 * 
 * 当前数据库 db
 * 
 * use test
 * 
 * db.dropDatabase
 * 
 * db.createCollection('user')
 * 
 * db.user.drop()/renameCollection('user2')
 * 
 * db.user.insert({name:'EXPECT'})/find({name:'EXPECT'})/remove()/update(条件，新的文档/{$set:{age:18}})
 * 
 * 
 * 引入mongoose,代码操作数据库
 * 
 * 
 */