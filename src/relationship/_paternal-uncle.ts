import { Person } from "../person";
import { Gender } from "../constant/type";
import { IRelationshipHandler } from "./interface";

export class PaternalUncleRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        if (!person.father || !person.father.mother) return [];

        return person.father.mother.children.filter(
            uncle => uncle.gender === Gender.Male && uncle !== person.father
        );
    }
}
