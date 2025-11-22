let num : number;

function add (a: number,b : number) {
    return a+b
}

type User = {
    name : string;
    age : number,
    gender? : "male" | "female";
}

let alice : User = {name : "Alice", age : 23}


let bob : User & {grade :"A"|"B"} ={
    name : "Bob",
    age : 25,
    grade : "A",
    gender : "female"
}


function wrap<T> (val : T) {
    return val
}

wrap ('abc')
wrap<number> (123)
wrap<User> (alice)