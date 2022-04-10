console.log("hello world");

// 引入http模块，监听本地：3001端口
const http = require('http');

const hostname = '127.0.0.1'
const port = 3001

// createServer（）方法会创建 HTTP服务器并返回它
const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('welcome to www.redGrape.com\n')
})

server.listen(port,hostname,()=>{
    console.log(`please visit http://${hostname}:${port}/`);
})


