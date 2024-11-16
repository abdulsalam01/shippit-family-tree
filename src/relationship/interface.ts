import { Person } from "../person";

export interface IRelationshipHandler {
    getRelatives(person: Person): Person[];
}
