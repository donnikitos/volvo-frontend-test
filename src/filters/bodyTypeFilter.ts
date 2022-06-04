import { BodyType } from "../enums/body-type";

export const bodyTypeFilter =
  <D extends { bodyType: BodyType }>(query?: BodyType) =>
  (item: D) =>
    !query || item.bodyType === query;

function filterBodyType<D extends { bodyType: BodyType }>(
  data: D[],
  query?: BodyType
) {
  return data.filter(bodyTypeFilter(query));
}

export default filterBodyType;
