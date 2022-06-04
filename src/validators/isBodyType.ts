import { BodyType, MBodyTypes } from "../enums/body-type";

function isBodyType(data: any): data is BodyType {
  return MBodyTypes.has(data);
}

export default isBodyType;
