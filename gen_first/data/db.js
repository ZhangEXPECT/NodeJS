

const mongoose = require('mongoose');

// 设置strictQuery
mongoose.set('strictQuery', true);

// 1、连接
mongoose.connect('mongodb://127.0.0.1:27017/test');


// 2、回调
// once 成功回调只执行一次
mongoose.connection.once('open', () => {
    console.log('connect succeed');
    // 3、创建文档的结构对象（映射db的集合）
    // 设置集合中文档的属性以及属性类型
    let UserSchema = new mongoose.Schema({
        name: String,
        age: Number,
        family: Array,
        birthDay: Date,
        // orderId: String,

        // 验证规则

        home: {
            type: String,
            require: true,
            unique: true  //独一无二的值，生效需要重新创建集合
        }

    });
    // 4、创建模型对象（操作文档）
    let UserModel = mongoose.model('User', UserSchema);

    // 5、常用方法
    // CRUD
    UserModel.create({
        name: '张三',
        age: 18,
        family: ['dad', 'mom', 'sis'],
        birthDay: new Date().getDate(),
        // orderId: mongoose.Schema.Types.ObjectId,//外键
        home:'江西'

    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });


    // 批量CRUD
    UserModel.insertMany({}).then();
    UserModel.deleteMany({}).then();
    UserModel.updateMany({}).then();
    UserModel.find({}).then();


    // mongoose.disconnect();
});
mongoose.connection.on('error', () => {
    console.log('connect failed');
});
mongoose.connection.on('close', () => {
    console.log('connect closed');
});




