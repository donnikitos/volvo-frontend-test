import React, {FC, ReactNode, useState} from 'react'
import {GetStaticProps, InferGetStaticPropsType} from 'next'
import carsData from '../public/api/cars.json'

import Carousel from '../src/components/Carousel'
import CarListItem from '../src/components/CarListItem'
import Filter from '../src/components/Filter'
import {BodyType, TCar} from '../src/types'

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({cars}) => {
  const [bodyTypeFilter, setBodyTypeFilter] = useState<'' | BodyType>('')
  const data = cars.reduce((acc: Array<ReactNode>, car: TCar) => {
    if (!bodyTypeFilter || car.bodyType === bodyTypeFilter) acc.push(<CarListItem key={car.id} car={car} />)
    return acc
  }, [])
  return (
    <>
      <Filter value={bodyTypeFilter} setValue={setBodyTypeFilter} />
      <Carousel data={data} key={`carousel-${bodyTypeFilter}`} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  return {
    props: {
      cars: carsData as Array<TCar>
    },
  }
}

export default Home
