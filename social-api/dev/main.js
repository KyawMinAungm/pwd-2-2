const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "some secret";
const user = { name: 'Mary', age: 24 };
const token = jwt.sign(user, SECRET);
console.log(token);

console.log(faker.person.fullName());

async function main() {
    const password = "apple";
	const hash = await bcrypt.hash(password, 10);
    console.log(hash);

    if(await bcrypt.compare("Apple", hash)) {
        console.log("Correct password");
    } else {
        console.log("Incorrect password");
    }
}

main();
