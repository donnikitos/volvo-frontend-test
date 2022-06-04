import React, { FC } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import carsData from "../public/api/cars.json";

import Carousel from "../src/components/Carousel";
import CarListItem from "../src/components/CarListItem";
import Filter from "../src/components/Filter";
import { TCar } from "../src/types";
import { MBodyTypes } from "../src/enums/body-type";
import { useRouter } from "next/dist/client/router";
import isBodyType from "../src/validators/isBodyType";

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ cars }) => {
  const { query, push } = useRouter();

  const bodyTypeFilter = isBodyType(query.body) ? query.body : "";

  const data = (cars as TCar[]).filter(
    (car) => !bodyTypeFilter || car.bodyType === bodyTypeFilter
  );

  return (
    <>
      <Filter
        options={MBodyTypes}
        value={bodyTypeFilter}
        setValue={(v) => {
          push(!v ? "." : `.?body=${v}`);
        }}
      />
      <Carousel data={data} key={`carousel-${bodyTypeFilter}`}>
        {(car) => <CarListItem key={car.id} car={car} />}
      </Carousel>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      cars: carsData as Array<TCar>,
    },
  };
};

export default Home;
