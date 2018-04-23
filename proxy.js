const http = require('http');
const request = require('request');
const hostname = '127.0.0.1';
const port = 8010;
const imgPort = 8011;

// 创建一个API代理服务
const apiServer = http.createServer((req, res) => {
  const url = 'http://news-at.zhihu.com/api/4' + req.url;
  const options = {
    url: url
  };
  function callback(error, response, body) {
    if(!error && response.statusCode === 200){
      // 设置编码
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      // 设置跨域
      res.setHeader('Access-Control-Allow-Origin','*');
      // 返回代理后的内容
      res.end(body)
    }
  }
  request.get(options, callback);
});

// 监听8010端口
apiServer.listen(port, hostname, () => {
  console.log('接口代理运行在http://${hostname}:${port}/');
})

// 创建图片代理服务
const imgServer = http.createServer((req, res) => {
  const url = req.url.split('/img/')[1];
  const options = {
    url: url,
    encoding: null
  };
  function callback(error, response, body) {
    if(!error && response.statusCode === 200){
      const contentType = response.headers['content-type'];
      res.setHeader('Content-Type', contentType);
      // 设置跨域
      res.setHeader('Access-Control-Allow-Origin','*');
      // 返回代理后的内容
      res.end(body)
    }
  }
  request.get(options, callback);
});

// 监听8010端口
apiServer.listen(port, hostname, () => {
  console.log('图片代理运行在http://${hostname}:${imgPort}/');
})
