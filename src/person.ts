import { Gender } from "./constant/type";

class Person {
    name: string;
    gender: Gender;

    mother?: Person;
    father?: Person;
    spouse?: Person;
    children: Person[] = [];

    constructor(name: string, gender: Gender) {
        this.name = name;
        this.gender = gender;
    }
}

export { Person };