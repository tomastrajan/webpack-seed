import './app.css';

import content from './content';
document.write(content);

import User from './user'

const name:string = 'Peter 111';

var peter = new User(name);
peter.sayHello();
