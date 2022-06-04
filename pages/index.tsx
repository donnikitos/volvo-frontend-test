import React, { FC, ReactNode } from "react";
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

  const data = cars.reduce((acc: Array<ReactNode>, car: TCar) => {
    if (!bodyTypeFilter || car.bodyType === bodyTypeFilter)
      acc.push(<CarListItem key={car.id} car={car} />);
    return acc;
  }, []);

  return (
    <>
      <Filter
        options={MBodyTypes}
        value={bodyTypeFilter}
        setValue={(v) => {
          push(!v ? "." : `.?body=${v}`);
        }}
      />
      <Carousel data={data} key={`carousel-${bodyTypeFilter}`} />
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
