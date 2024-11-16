import { FamilyTree } from "./src/family";
import { Gender } from "./src/constant/type";


function bootstrap() {
    // Sample usage.
    const familyTree = new FamilyTree();

    // Initialize family members and relationships.
    familyTree.addMember("Queen Margaret", Gender.Female);
    familyTree.addMember("King Arthur", Gender.Male);

    // Set spouses internally when adding children.
    familyTree.getMember("Queen Margaret")!.spouse = familyTree.getMember("King Arthur");
    familyTree.getMember("King Arthur")!.spouse = familyTree.getMember("Queen Margaret");

    // Family set.
    familyTree.addChild("Queen Margaret", "Bill", Gender.Male);
    familyTree.addChild("Queen Margaret", "Charlie", Gender.Male);
    familyTree.addChild("Queen Margaret", "Percy", Gender.Female);
    familyTree.addChild("Queen Margaret", "Fred", Gender.Male);
    familyTree.addChild("Queen Margaret", "George", Gender.Female);
    familyTree.addChild("Queen Margaret", "Ron", Gender.Male);
    familyTree.addChild("Queen Margaret", "Ginny", Gender.Female);

    // Test the getRelationship method.
    console.log(familyTree.getRelationship("Ginny", "Brother-In-Law"));
}

bootstrap();