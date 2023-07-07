// token jwt
// npm i jsonwebtoken，导入jwt
const jwt = require('jsonwebtoken');

// 创建token
// jwt.sign(用户数据，加密字符串，配置对象)
// let token = jwt.sign({ usernam: 'EXPECT' }, 'key', {
//     expiresIn: 60//秒
// });

// console.log(token);


// token 校验
jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtIjoiRVhQRUNUIiwiaWF0IjoxNjg4NjEyNDYwLCJleHAiOjE2ODg2MTI1MjB9.INtbiFe5isp15PNwkPp8Y6pSv_0ep1ZalwYPsDVssX4', 'key', (err, data) => {
    if (err) {
        console.log('token过期');
        return 
    } else {
        console.log(data);
    }
});


