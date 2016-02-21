var obj1 = {};
var obj2 = Object.create(obj1);
obj1.__proto__ = obj2;
console.log(obj1.a);