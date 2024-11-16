import { Person } from "../person";
import { IRelationshipHandler } from "./interface";

export class SiblingsRelationship implements IRelationshipHandler {
    getRelatives(person: Person): Person[] {
        if (!person.mother) return [];
        
        return person.mother.children.filter(sibling => sibling !== person);
    }
}