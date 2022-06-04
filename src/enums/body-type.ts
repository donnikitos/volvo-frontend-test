export enum BodyType {
  suv = "suv",
  estate = "estate",
  sedan = "sedan",
}

export const MBodyTypes: Map<BodyType, string> = new Map([
  [BodyType.suv, "SUV"],
  [BodyType.estate, "Estate"],
  [BodyType.sedan, "Sedan"],
]);
