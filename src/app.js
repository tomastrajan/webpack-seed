import './app.css';

import content from './content.js';
document.write(content);

console.log(111);

class User {
    constructor(name) {
        this.name = name;
    }

    lol() {

    }

    sayHello() {
        console.log(this.name);
    }
}

var user = new User('Peter');
user.sayHello();
