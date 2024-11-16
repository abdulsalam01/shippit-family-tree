import { Person } from "../person";
import { Gender } from "../constant/type";
import { IRelationshipHandler } from "./interface";

export class BrotherInLawRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        if (!person.mother) return [];

        return person.mother.children.filter(
            (sibling) => sibling.gender === Gender.Male && sibling !== person
        );
    }
}
