/*
Mi a különbség a nextIndex === -1 és a nextIndex = -1 között!!! 
Az egyik egy comparison operator a nextIndex === -1 
ha ez tényleg -1, akkor true lesz, ha viszont nem annyi, akkor meg false 

a másik a nextIndex = -1 az meg egy értékadó operator 
akkor a nextIndex értéke az -1 lesz!!!!

1.
nextIndex === -1 (Comparison Operator):

This is a comparison operation.
It checks if the value of nextIndex is strictly equal to -1.
The === operator is the strict equality operator in JavaScript, which means it checks both the value and the type.
If nextIndex is -1, the expression nextIndex === -1 evaluates to true. Otherwise, it evaluates to false.
*/

let nextIndex = -1;
if (nextIndex === -1) {
    console.log('nextIndex is -1');
}

/*
2. 
nextIndex = -1 (Assignment Operator):

This is an assignment operation.
It assigns the value -1 to the variable nextIndex.
The = operator is used to set the value of a variable.
*/

let nextIndex1;
nextIndex1 = -1; // nextIndex is now assigned the value -1

/*
nextIndex === -1: Compares nextIndex to -1. Returns true if they are the same value and type, otherwise false.
nextIndex = -1: Assigns the value -1 to the variable nextIndex.
****************************************************************************************************************************************
*/

/*
Hol tudunk js-ben extend-et használni!!!!!!!! 
1.
amikor van egy class-unk és csinálunk még egy class-t, aminek átadjuk az eredeti class-nak a dolgait, ezt az extend-vel tudjuk megcsinálni!!!! 
*/ 

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise!`);
    }
}


class Dog extends Animal {
    constructor(name, breed) {
        super(name); //Calls the constructor of the parent class 
        this.breed = breed;
    }

    speak() {
        console.log(`${this.name} barks`)
    }
}

let dog = new Dog("Rex", "Labrador");
dog.speak(); //Rex barks 

/*
2. 
JavaScript allows you to extend built-in classes such as Array, Error, Date, etc. 
This can be useful when you need to add custom methods or properties to these classes.
*/

class CustomArray extends Array {
    customMethod() {
        console.log("This is a custom method of an exteneded array.");
    }
}

let arr = new CustomArray();
arr.push(1, 2, 3);
arr.customMethod(); //This is a custom method of an extended array.
console.log(arr); //CustomArray [1, 2, 3]

//3.

import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
            </div>
        );
    }
}

export default MyComponent;

/*
The extends keyword in JavaScript is primarily used in class-based programming to create a subclass that inherits from a parent class, 
facilitating code reuse, organization, and polymorphism. 
This is particularly useful in scenarios involving object-oriented design, custom extensions of built-in classes, 
and component-based architectures like React.
*/