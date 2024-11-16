import { Person } from "../person";
import { Gender } from "../constant/type";
import { IRelationshipHandler } from "./interface";

export class PaternalAuntRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        if (!person.father || !person.father.mother) return [];

        return person.father.mother.children.filter(
            aunt => aunt.gender === Gender.Female && aunt !== person.father
        );
    }
}