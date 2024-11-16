import { Person } from "../person";
import { Gender } from "../constant/type";
import { IRelationshipHandler } from "./interface";

export class SonRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        return person.children.filter(child => child.gender === Gender.Male);
    }
}