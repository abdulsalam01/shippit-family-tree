import { Person } from "./person";
import { Gender, RelationshipHandlerType } from "./constant/type";
import { RelationshipHandlerFactory } from "./relationship/factory";
import {
    ERROR_CHILD_ADDITION_FAILED,
    ERROR_NONE,
    ERROR_PERSON_NOT_FOUND,
    SUCCESS_CHILD_ADDED,
} from "./constant/dict";

interface iFamilyTree {
    addMember(name: string, gender: Gender): void;
    addChild(motherName: string, childName: string, gender: Gender): string;
    getRelationship(name: string, relationship: string): string;
}

export class FamilyTree implements iFamilyTree {
    members: Map<string, Person>;

    constructor() {
        // Calls RelationshipHandlerFactory.init() to register all relationship handlers in the system.
        RelationshipHandlerFactory.init();
        // Initialize the members map.
        this.members = new Map<string, Person>();
    }

    /**
     * !Function Extension.
     * Adds a new member to the family tree.
     * If a member with the given name already exists, the function does nothing to avoid duplicates.
     * The new member is created with the specified name and gender and added to the members map.
     */
    addMember(name: string, gender: Gender): void {
        // Member already exists.
        if (this.members.has(name)) {
            return;
        }

        const person = new Person(name, gender);
        this.members.set(name, person);
    }

    /**
     * !Function Extension.
     * Retrieves a member from the family tree by their name.
     * Returns the Person object if found; otherwise, returns undefined.
     * This function allows other methods to access members of the family tree.
     */
    getMember(name: string): Person | undefined {
        return this.members.get(name);
    }

    /**
     * Adds a new child to the family tree for a given mother.
     * @param motherName - The name of the mother to whom the child should be added.
     * @param childName - The name of the new child.
     * @param gender - The gender of the new child.
     * @returns A status string indicating success or failure.
     */
    addChild(motherName: string, childName: string, gender: Gender): string {
        const mother = this.getMember(motherName);
        if (!mother) {
            return ERROR_PERSON_NOT_FOUND;
        }
        if (mother.gender !== Gender.Female) {
            return ERROR_CHILD_ADDITION_FAILED;
        }
        if (this.members.has(childName)) {
            return ERROR_CHILD_ADDITION_FAILED; // Child already exists.
        }

        const child = new Person(childName, gender);

        child.mother = mother;
        if (mother.spouse) {
            child.father = mother.spouse;
        }

        mother.children.push(child);
        if (mother.spouse) {
            mother.spouse.children.push(child);
        }

        this.members.set(childName, child);
        return SUCCESS_CHILD_ADDED;
    }

    /**
     * Retrieves relatives of a specified person based on a given relationship type.
     * @param name - The name of the person whose relatives are being requested.
     * @param relationship - The type of relationship for which relatives are needed.
     * @returns A string with the names of relatives or an error/status message.
     */
    getRelationship(
        name: string,
        relationship: RelationshipHandlerType
    ): string {
        const person = this.getMember(name);
        if (!person) {
            return ERROR_PERSON_NOT_FOUND;
        }

        const handler = RelationshipHandlerFactory.getHandler(relationship);
        if (!handler) {
            return ERROR_NONE;
        }

        const relatives = handler.getRelatives(person);
        if (relatives.length === 0) {
            return ERROR_NONE;
        }

        const names = relatives.map(p => p.name);
        return names.join(' ');
    }
}
