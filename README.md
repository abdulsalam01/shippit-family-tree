# Shippit Family Tree

**By**: abdulsalam01
**Version**: 1.0.0

## Overview

The **Shippit Family Tree** is a TypeScript-based solution for modeling family relationships, allowing you to add family members, define relationships, and query relationships dynamically. This project uses an extensible relationship handler architecture that adheres to SOLID principles, making it easy to add new relationships without modifying existing code.

This repository includes a robust set of test cases to verify family tree operations using Jest, providing reliability and ensuring correctness.

## Features

- **Dynamic Family Tree Construction**: Add members and relationships interactively.
- **Extensible Relationship Management**: Easily add new relationship types through a relationship handler factory.
- **Efficient Queries**: Query complex relationships (e.g., siblings, aunts/uncles, in-laws) with simple method calls.
- **Robust Testing**: Comprehensive test coverage using Jest.

## Project Structure

- **`index.ts`**: Main entry file for initializing and interacting with the family tree.
- **`family.ts`**: Core class defining the family tree operations, including adding members and querying relationships.
- **`relationship/`**: Directory containing individual relationship handler classes (e.g., `SonRelationship`, `SisterInLawRelationship`).
- **`relationshipHandlerFactory.ts`**: Factory that registers and provides relationship handlers.
- **`index.test.ts`**: Test file with comprehensive test cases to validate family tree operations.
- **`person.ts`**: Defines the `Person` class representing individual family members.
- **`gender.ts`**: Enum for `Gender` to maintain type safety.
- **`relationshipHandlerType.ts`**: Defines supported relationship types.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/abdulsalam01/shippit-family-tree.git
   cd shippit-family-tree
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Starting the Application

To run the `index.ts` file, which demonstrates family tree functionality:

```bash
npm run start
```

### Adding Members and Relationships

The `FamilyTree` class offers methods for adding members and querying relationships. Example usage:

```typescript
const familyTree = new FamilyTree();

// Add initial family members and relationships
familyTree.addMember("Queen Margaret", Gender.Female);
familyTree.addMember("King Arthur", Gender.Male);
familyTree.addChild("Queen Margaret", "Bill", Gender.Male);
familyTree.addChild("Queen Margaret", "Ginny", Gender.Female);

// Query relationships
console.log(familyTree.getRelationship("Ginny", "Brother-In-Law"));
```

### Running Tests

Jest is used for testing. The test file (`index.test.ts`) provides comprehensive test coverage.

To run tests:

```bash
npm run test
```

## Key Classes and Methods

### `Family`

The `FamilyTree` class manages family members, relationships, and querying operations.

- **`addMember(name: string, gender: Gender): void`**  
  Adds a new family member to the tree.

- **`addChild(motherName: string, childName: string, gender: Gender): string`**  
  Adds a child to a specified mother. Returns a status string indicating success or failure.

- **`getRelationship(name: string, relationship: RelationshipHandlerType): string`**  
  Retrieves relatives based on the specified relationship type. Returns a string of names or an error/status message.

### `RelationshipHandlerFactory`

The `RelationshipHandlerFactory` is responsible for registering and retrieving relationship handlers, allowing for a flexible and extensible relationship management system.

- **`registerHandler(relationship: RelationshipHandlerType, handler: IRelationshipHandler): void`**  
  Registers a handler for a specific relationship type.

- **`getHandler(relationship: RelationshipHandlerType): IRelationshipHandler | undefined`**  
  Retrieves the handler for a specified relationship type.

### Adding New Relationships

To add a new relationship type:

1. Create a new handler class in `RelationshipHandlers/` that implements `IRelationshipHandler`.
2. Register the new handler in `RelationshipHandlerFactory` using `registerHandler`.

Example:

```typescript
class CousinRelationship implements IRelationshipHandler {
  getRelatives(person: Person): Person[] {
    // Implement cousin relationship logic here
  }
}

// Register the new handler
RelationshipHandlerFactory.registerHandler("Cousin", new CousinRelationship());
```

## Scripts

- **`npm run start`**: Compiles and runs `index.ts`.
- **`npm run test`**: Runs Jest test cases.

## Development

This project uses TypeScript for type safety and Jest for testing. The extensible architecture allows for adding new relationships easily by defining new handler classes and registering them with the factory.

### Recommended Tools

- **Visual Studio Code** with TypeScript and Jest extensions for code linting and test running.
- **Prettier** or **ESLint** to maintain code style and consistency.

## Dependencies

- **TypeScript**: For strict typing and advanced language features.
- **Jest**: Testing framework to ensure robustness of family tree operations.

---

For questions or contributions, please contact the author or submit a pull request on GitHub.
by: Abdul Salam