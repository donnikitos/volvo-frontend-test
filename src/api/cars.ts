import axios from "axios";
import { BodyType } from "../enums/body-type";
import { TCar } from "../types";
import filterBodyType from "../filters/bodyTypeFilter";

export type CarsListArgs = { bodyType?: BodyType };

export async function list({ bodyType }: CarsListArgs) {
  try {
    // The data will be refetched every time the parameter changes
    // As far as I know that is desired (when not using pure JSON files :))
    const result = (await axios.get<TCar[]>(list.endpoint)).data;

    return filterBodyType(result, bodyType);
  } catch (e) {
    return undefined;
  }
}
list.endpoint = "/api/cars.json";
