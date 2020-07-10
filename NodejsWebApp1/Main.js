var Hello = require('./hello');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello(); 
const util = require('util');


//函数当做参数,相对于委托
function say(word) {
    console.log(word);
}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, "SayHello 委托");