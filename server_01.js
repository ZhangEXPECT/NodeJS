// 1、使用http模块搭建后端服务
// const http = require('http');

// const server = http.createServer(function (req, res) {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/html')
//     res.end('TRY')
// });

// server.listen(8888, function () {
//     console.log('服务启动!!! 端口号8888');
// });


// 2、使用express搭建后端服务
const express = require('express');
const app = express();//npm i -g express-ganerater
const port = 8888


// 3、定义路由 app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
    throw new Error();
    res.send('Hello World!')
});

app.post('/merchant', (req, res) => {
    res.status(200).send('商户：太仓')
});

app.put('/product', (req, res) => {
    res.send('商品：床')
});

app.all('/productDetail', (req, res) => [
    res.send({
        name: '床',
        merchant: '太仓'
    })
]);

// 4、路由拆分 /user/detail
const user = express.Router();
user.get('/detail', (req, res) => {
    res.send({
        name: 'EXPECT',
        age: 18
    })
});

app.use('/user', user);//注册子路由



// 5、中间件


function middleware(req, res, next) {
    console.log('全局中间件');
    next();
}
app.use(middleware);//注册

app.get('/user', function (req, res, next) {
    console.log('路由中间件');
    next();
}, (req, res) => {
    console.log('请求参数', req.query);
    // 路由参数req.params.id
    res.status(200).send('用户：EXPECT')
});


// 日志中间件
const logger = require('./logger');
app.use(logger);

app.get('/log', (req, res) => {
    res.send('Hello World!')
});

// 6、使用模板引擎
app.set('views', 'views');//存放目录
app.set('view engine', 'hbs');//指定模板引擎

app.get('/about', (req, res) => {
    res.render('about', { name: 'EXPECT' })
});


// 7、静态文件服务
app.use(express.static('public'));//静态资源中间件


// 8、404和服务器错误
app.use('*', (req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
    res.status(500).render('500', { url: req.originalUrl });
});




app.listen(port, () => {
    console.log(`EXPRESS服务启动！！ 端口号${port}`)
});

