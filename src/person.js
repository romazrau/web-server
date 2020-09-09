class Person {
    constructor(name="RR" , age=18){
        this.name = name;
        this.age = age;
    }
    toJSON(){
        const obj = {
            name: this.name,
            age: this.age
        };
        return JSON.stringify(obj);
    }
}


const me = "Hey is me";

module.exports = {Person,  me};

