import React from 'react'
import Card from './Card/Card'

const cards = props =>
   props.cardsData.map((card, index) => {
      return (
         <Card
            key={index}
            id={card.id}
            title={card.title}
            value={card.value}
            click={() => props.clicked(index)}
         />
      )
   })

export default cards
