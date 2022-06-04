import { BodyType } from "../enums/body-type";

export enum ModelType {
  plugInHybrid = "plug-in hybrid",
  pureElectric = "pure electric",
}

export interface TCar {
  id: string;
  modelName: string;
  bodyType: BodyType;
  modelType: ModelType;
  imageUrl: string;
}
