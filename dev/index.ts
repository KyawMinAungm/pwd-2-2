let num: number;

function add(a: number, b: number) {
    return a + b;
}

type User = {
    name: string;
    age: number;
    gender?: "male" | "female";
}

let alice: User = { name: "Alice", age: 22 };

let bob: User & { grade: "A" | "B" } = {
    name: "Bob",
    age: 22,
    grade: "A",
};

function wrap<T>(val: T) {
    return [val];
}

wrap<string>("abc");
wrap<number>(123);
wrap<User>(alice);
