'use-strict';

export default class User {

    name:string;

    constructor(name:string) {
        this.name = name;
    }

    sayHello():void {
        console.log('Hello ' + this.name);
    }

}