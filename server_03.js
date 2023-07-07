const express = require('express');
const bodyParser = require('body-parser');

// 操作cookie、session
const cookieParser = require('cookie-parser');
const session = require('express-session');
// 连接mongodb
const mongoStore = require('connect-mongo');




const app = express();
const port = 8888;


// 日志中间件
const logger = require('./logger');
const MongoStore = require('connect-mongo');
app.use(logger);

// 模板引擎
app.set('views', 'views');
app.set('view engine', 'hbs');

//静态资源中间件
app.use(express.static('public'));

// 解析JSON格式的请求体的中间件
const jsonParser = bodyParser.json();
// 解析queryString格式的请求体的中间件
const urlencodeParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());

// 运行后数据库自动创建session集合
app.use(session({
    name: 'uid',
    secret: '1305172969',//加密
    saveUninitialized: false,//是否为每次请求都设置一个cookie保存session_id
    resave: true,//请求时重新保存session
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/test'
    }),
    cookie: {
        httpOnly: true,// 仅传输使用，不允许js访问（document.cookie）
        maxAge: 1000 * 60 //过期时间
    }
}))



// 路由规则
app.get('/', (req, res) => {
    res.render('about', { name: 'EXPECT' })
});


app.get('/login', (req, res) => {
    res.status(200).render('login', { url: 'login' })  //sendFile和render的区别
    // res.sendFile(__dirname + '/login.html')
});

// 会话控制
app.post('/login', urlencodeParser, (req, res) => {
    // session判断
    if (req.session.username) {
        res.send('登陆成功');
    } else {
        // 首次登录
        if (req.body.username == 'admin' && req.body.password == '123') {
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            res.send(`登陆成功~~${req.session.username}`);
        } else {
            res.send(`账号密码不正确~~`);
        }
    }
    // 操作cookie
    // res.cookie("name", 'EXPECT');
    // console.log(req.cookies);
    // res.clearCookie("name");
    // res.send(req.body);
    // req.query
});
app.get('logout', (req, res) => {
    req.session.destroy(() => {
        res.send(`退出成功~~`);
    })
})


app.use('*', (req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
    res.status(500).render('500', { url: req.originalUrl });
});
app.listen(port, () => {
    console.log(`服务启动！！ 端口号${port}`)
});

