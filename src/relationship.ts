import { Person } from "./person";
import { Gender, RelationshipHandlerType } from "./constant/type";

export const RelationshipHandlers: Record<RelationshipHandlerType, (person: Person) => Person[]> = {
    "Son": (person: Person): Person[] =>
        person.children.filter(
            (child) => child.gender === Gender.Male
        ),

    "Daughter": (person: Person): Person[] =>
        person.children.filter(
            (child) => child.gender === Gender.Female
        ),

    "Siblings": (person: Person): Person[] => {
        if (!person.mother) return [];

        return person.mother.children.filter(
            (sibling) => sibling !== person
        );
    },

    "Maternal-Aunt": (person: Person): Person[] => {
        if (!person.mother || !person.mother.mother) return [];

        return person.mother.mother.children.filter(
            (aunt) => aunt.gender === Gender.Female && aunt !== person.mother
        );
    },

    "Paternal-Aunt": (person: Person): Person[] => {
        if (!person.father || !person.father.mother) return [];

        return person.father.mother.children.filter(
            (aunt) => aunt.gender === Gender.Female && aunt !== person.father
        );
    },

    "Maternal-Uncle": (person: Person): Person[] => {
        if (!person.mother || !person.mother.mother) return [];

        return person.mother.mother.children.filter(
            (uncle) => uncle.gender === Gender.Male && uncle !== person.mother
        );
    },

    "Paternal-Uncle": (person: Person): Person[] => {
        if (!person.father || !person.father.mother) return [];

        return person.father.mother.children.filter(
            (uncle) => uncle.gender === Gender.Male && uncle !== person.father
        );
    },

    "Sister-In-Law": (person: Person): Person[] => {
        if (!person.mother) return [];

        return person.mother.children.filter(
            (sibling) => sibling.gender === Gender.Female && sibling !== person
        )
    },

    "Brother-In-Law": (person: Person): Person[] => {
        if (!person.mother) return [];

        return person.mother.children.filter(
            (sibling) => sibling.gender === Gender.Male && sibling !== person
        )
    },
};