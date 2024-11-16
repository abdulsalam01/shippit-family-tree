// Importing relationship handler classes for the factory or registry.
// Each class implements the IRelationshipHandler interface for a specific relationship type.
import { BrotherInLawRelationship } from "./_brother-in-law";
import { DaughterRelationship } from "./_daughter";
import { MaternalAuntRelationship } from "./_maternal-aunt";
import { MaternalUncleRelationship } from "./_maternal-uncle";
import { PaternalAuntRelationship } from "./_paternal-aunt";
import { PaternalUncleRelationship } from "./_paternal-uncle";
import { SiblingsRelationship } from "./_siblings";
import { SisterInLawRelationship } from "./_sister-in-law";
import { SonRelationship } from "./_son";

import { RelationshipHandlerType } from "../constant/type";
import { IRelationshipHandler } from "./interface";

// Relationship Handler Factory.
export class RelationshipHandlerFactory {
    private static handlers: Map<RelationshipHandlerType, IRelationshipHandler> = new Map();

    static init() {
        // Register handlers.
        RelationshipHandlerFactory.registerHandler("Son", new SonRelationship());
        RelationshipHandlerFactory.registerHandler("Daughter", new DaughterRelationship());
        RelationshipHandlerFactory.registerHandler("Siblings", new SiblingsRelationship());
        RelationshipHandlerFactory.registerHandler("Maternal-Aunt", new MaternalAuntRelationship());
        RelationshipHandlerFactory.registerHandler("Paternal-Aunt", new PaternalAuntRelationship());
        RelationshipHandlerFactory.registerHandler("Maternal-Uncle", new MaternalUncleRelationship());
        RelationshipHandlerFactory.registerHandler("Paternal-Uncle", new PaternalUncleRelationship());
        RelationshipHandlerFactory.registerHandler("Sister-In-Law", new SisterInLawRelationship());
        RelationshipHandlerFactory.registerHandler("Brother-In-Law", new BrotherInLawRelationship());
    }
        
    static registerHandler(
        relationship: RelationshipHandlerType,
        handler: IRelationshipHandler
    ) {
        this.handlers.set(relationship, handler);
    }

    static getHandler(relationship: RelationshipHandlerType): IRelationshipHandler | undefined {
        return this.handlers.get(relationship);
    }
}