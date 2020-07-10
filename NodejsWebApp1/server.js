'use strict';
var http = require('http');
var url = require('url');
var util = require('util');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    //res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
 


    res.end('Hello World 1\n');
}).listen(port);

console.log("First Node Js Project");
