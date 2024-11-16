import { Person } from "../person";
import { Gender } from "../constant/type";
import { IRelationshipHandler } from "./interface";

export class MaternalAuntRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        if (!person.mother || !person.mother.mother) return [];
        
        return person.mother.mother.children.filter(
            aunt => aunt.gender === Gender.Female && aunt !== person.mother
        );
    }
}