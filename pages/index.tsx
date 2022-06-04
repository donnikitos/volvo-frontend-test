import React from "react";

import Carousel from "../src/components/Carousel";
import CarListItem from "../src/components/CarListItem";
import Filter from "../src/components/Filter";
import { MBodyTypes } from "../src/enums/body-type";
import { useRouter } from "next/dist/client/router";
import isBodyType from "../src/validators/isBodyType";
import useSWR from "swr";
import api from "../src/api";

function Home() {
  const { query, push } = useRouter();

  const bodyType = isBodyType(query.body) ? query.body : undefined;

  const { data } = useSWR({ bodyType }, api.cars.list);

  return (
    <>
      <Filter
        options={MBodyTypes}
        value={bodyType || ""}
        setValue={(v) => {
          push(!v ? "." : `.?body=${v}`);
        }}
      />
      {data && (
        <Carousel data={data} key={`carousel-${bodyType}`}>
          {(car) => <CarListItem key={car.id} car={car} />}
        </Carousel>
      )}
    </>
  );
}

export default Home;
