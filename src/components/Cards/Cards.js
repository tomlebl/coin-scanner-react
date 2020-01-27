import React from 'react'
import Card from './Card/Card'
import classes from './Cards.module.css'

const cards = props => {
	const cardArr = props.cardsData.map((card, index) => (
		<Card
			key={index}
			id={card.id}
			title={card.title}
			value={card.value}
			click={() => props.clicked(index)}
		/>
	))
	return <div className={classes.Cards}>{cardArr}</div>
}

export default cards
