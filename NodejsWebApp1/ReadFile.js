var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);

    console.log(data.toString());
});
fs.writeFile('hello.txt', 'text', function () {
    console.log("文件写入完成");
});
console.log("程序执行结束!");
