// Gender type for extensibility.
export enum Gender {
    Male = 'Male',
    Female = 'Female'
};

export type RelationshipHandlerType = 
  | "Son"
  | "Daughter"
  | "Siblings"
  | "Maternal-Aunt"
  | "Paternal-Aunt"
  | "Paternal-Uncle"
  | "Maternal-Uncle"
  | "Sister-In-Law"
  | "Brother-In-Law";