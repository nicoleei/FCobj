var person = {};
person.name = 'my name';
person.age = 30;
person.getName = function(){
  return this.name;
}


var person = {
  name : 'my name',
  age : 20,
  getName : function(){
    return this.name;
  }
};

person.newAttr = 'height';
console.log(person.newAttr);
delete person.name;
console.log(person.name);



var person = {
  name : "nico",
  age : 30,
  height : 165,
  getName : function(){
    return this.name;
  },
  getAge : function(){
    return this.age;
  },
  setName : function(name){
    this.name = name;
  },
  setAge : function(age){
    this.age = age;
  }

}
// console.log(person.getName());
// console.log(person.getAge());
person.setName("jfeng");
alert(person.getName());


/*var dog ={
  type : 'langgou',
  color : 'red',
  height : '0.5',
  eat : function(){
    console.log(food);
  }

}*/
/*
function Dog(type,color,food){
  this.type = type;
  this.color = color;
  this.eat = function(){
    console.log(food)
  }

}
var dog1 = new Dog('hasiqi','white','meet');
console.log(dog1.type)

*/
