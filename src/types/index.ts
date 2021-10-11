export enum ModelType {
  plugInHybrid = "plug-in hybrid",
  pureElectric = "pure electric",
}

export enum BodyType {
  suv = "suv",
  estate = "estate",
  sedan = "sedan",
}

export interface TCar {
  id: string
  modelName: string
  bodyType: BodyType
  modelType: ModelType
  imageUrl: string
}
