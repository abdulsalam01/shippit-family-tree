// index.test.ts
import { FamilyTree } from './src/family';
import { Gender } from './src/constant/type';

describe('FamilyTree', () => {
    let familyTree: FamilyTree;

    beforeEach(() => {
        // Initialize the family tree before each test.
        familyTree = new FamilyTree();

        // Set up the initial family members and relationships.
        familyTree.addMember('Queen Margaret', Gender.Female);
        familyTree.addMember('King Arthur', Gender.Male);

        // Set spouses internally.
        const queenMargaret = familyTree.getMember('Queen Margaret');
        const kingArthur = familyTree.getMember('King Arthur');
        if (queenMargaret && kingArthur) {
            queenMargaret.spouse = kingArthur;
            kingArthur.spouse = queenMargaret;
        }

        familyTree.addChild('Queen Margaret', 'Bill', Gender.Male);
        familyTree.addChild('Queen Margaret', 'Charlie', Gender.Male);
        familyTree.addChild('Queen Margaret', 'Percy', Gender.Male);
        familyTree.addChild('Queen Margaret', 'Fred', Gender.Male);
        familyTree.addChild('Queen Margaret', 'George', Gender.Female);
        familyTree.addChild('Queen Margaret', 'Ron', Gender.Male);
        familyTree.addChild('Queen Margaret', 'Ginny', Gender.Female);

        // Adding spouses for siblings.
        familyTree.addMember('Angelina', Gender.Female);

        const fred = familyTree.getMember('Fred');
        const angelina = familyTree.getMember('Angelina');
        if (fred && angelina) {
            fred.spouse = angelina;
            angelina.spouse = fred;
        }

        familyTree.addMember('Harry', Gender.Male);

        const ginny = familyTree.getMember('Ginny');
        const harry = familyTree.getMember('Harry');
        if (ginny && harry) {
            ginny.spouse = harry;
            harry.spouse = ginny;
        }
    });

    test('should add a child successfully', () => {
        const result = familyTree.addChild('Ginny', 'James', Gender.Male);
        expect(result).toBe('CHILD_ADDED');

        const ginny = familyTree.getMember('Ginny');
        const james = familyTree.getMember('James');

        expect(ginny?.children).toContain(james);
        expect(james?.mother).toBe(ginny);
    });

    test('should fail to add a child to a male parent', () => {
        const result = familyTree.addChild('Harry', 'Albus', Gender.Male);
        expect(result).toBe('CHILD_ADDITION_FAILED');
    });

    test('should get siblings correctly', () => {
        const siblings = familyTree.getRelationship('Ginny', 'Siblings');
        expect(siblings).toBe('Bill Charlie Percy Fred George Ron');
    });

    test('should get sister-in-law correctly', () => {
        const sistersInLaw = familyTree.getRelationship('Ginny', 'Sister-In-Law');
        expect(sistersInLaw).toBe('George');
    });

    test('should get brother-in-law correctly', () => {
        const brothersInLaw = familyTree.getRelationship('Ginny', 'Brother-In-Law');
        expect(brothersInLaw).toBe('Bill Charlie Percy Fred Ron');
    });

    test('should return PERSON_NOT_FOUND for unknown member', () => {
        const result = familyTree.getRelationship('Unknown', 'Siblings');
        expect(result).toBe('PERSON_NOT_FOUND');
    });

    test('should return NONE when no relatives found', () => {
        const result = familyTree.getRelationship('Queen Margaret', 'Maternal-Aunt');
        expect(result).toBe('NONE');
    });

    test('should return NONE find maternal uncles', () => {
        // Adding parents for Queen Margaret to test maternal uncles.
        familyTree.addMember('Grandmother', Gender.Female);
        familyTree.addMember('Grandfather', Gender.Male);
        
        const grandmother = familyTree.getMember('Grandmother');
        const grandfather = familyTree.getMember('Grandfather');
        if (grandmother && grandfather) {
            grandmother.spouse = grandfather;
            grandfather.spouse = grandmother;
        }

        familyTree.addChild('Grandmother', 'Queen Margaret', Gender.Female);
        familyTree.addChild('Grandmother', 'Uncle Bob', Gender.Male);

        const maternalUncles = familyTree.getRelationship('Ginny', 'Maternal-Uncle');
        expect(maternalUncles).toBe('NONE');
    });
});
