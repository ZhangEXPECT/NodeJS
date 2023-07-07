const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8888;


// 日志中间件
const logger = require('./logger');
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

// 路由规则
app.get('/', (req, res) => {
    res.render('about', { name: 'EXPECT' })
});


app.get('/login', (req, res) => {
    res.status(200).render('login', { url: 'login' })  //sendFile和render的区别
    // res.sendFile(__dirname + '/login.html')
});


app.post('/login', urlencodeParser, (req, res) => {
    res.send(req.body);
    // req.query
});


// 防盗链....等


app.use('*', (req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
    res.status(500).render('500', { url: req.originalUrl });
});
app.listen(port, () => {
    console.log(`服务启动！！ 端口号${port}`)
});

