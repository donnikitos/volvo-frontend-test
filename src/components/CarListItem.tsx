import React, {FC} from 'react'
import {Block, Text, useTheme, Link, Flex} from 'vcc-ui'
import {useFela} from 'react-fela'

import {TCar} from '../types'

interface Props {
  car: TCar
}
const CarListItem: FC<Props> = ({car}) => {
  const theme = useTheme()
  const {css} = useFela()
  return (
    <Block>
      <a href={`/learn/${car.id}`} className={css({textDecoration: 'none'})}>
        <Block extend={{flex: 1}}>
          <Text
            extend={{textTransform: 'uppercase', color: theme.color.foreground.secondary}}
            variant="bates"
            subStyle="emphasis"
          >
            {car.bodyType}
          </Text>
          <Block as="h4" extend={{margin: '0 0 4px 0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text as="span" extend={{marginRight: 5}} subStyle="emphasis" variant="columbus">{car.modelName}</Text>
            <Text
              as="span"
              extend={{color: theme.color.foreground.secondary, textTransform: 'capitalize'}}
              variant="columbus"
            >
              {car.modelType}
            </Text>
          </Block>
        </Block>
        <Block extend={{margin: '16px 0'}}>
          <img className={css({width: '100%'})} src={car.imageUrl} alt={car.modelName}/>
        </Block>
      </a>
      <Flex extend={{justifyContent: 'space-around', flexWrap: 'wrap', flexDirection: 'row'}}>
        <Link href={`/learn/${car.id}`} arrow="right">
          Learn
        </Link>
        <Link href={`/shop/${car.id}`} arrow="right">
          Shop
        </Link>
      </Flex>
    </Block>
  )
}

export default CarListItem
