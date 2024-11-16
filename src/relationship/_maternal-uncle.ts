import { Person } from "../person";
import { Gender } from "../constant/type";
import { IRelationshipHandler } from "./interface";

export class MaternalUncleRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        if (!person.mother || !person.mother.mother) return [];

        return person.mother.mother.children.filter(
            uncle => uncle.gender === Gender.Male && uncle !== person.mother
        );
    }
}