import React from 'react'
import classes from './Card.module.css'

const card = props => {
	let cardClass = [classes.card]
	let title = ''
	let unit = ''

	switch (props.id) {
		case 't-mcap':
			cardClass.push(classes.mcap)
			title = 'total market cap'
			unit = ' B $'
			break
		case 't-vol':
			cardClass.push(classes.vol)
			title = '24h volume'
			unit = ' B $'
			break
		case 'btc-dom':
			cardClass.push(classes.dom)
			title = 'bitcoin dominance'
			unit = ' %'
			break
		case 'avg-change':
			cardClass.push(classes.avgChange)
			title = 'average market cap change'
			unit = ' %'
			break
		case 'vol-change':
			cardClass.push(classes.volChange)
			title = 'volume change'
			unit = ' %'
			break
		default:
			cardClass.push(classes.default)
	}

	return (
		<div className={props.show ? cardClass.join(' ') : classes.noShow} onClick={props.click}>
			<h5>{title}</h5>
			<p>{props.value.toString() + unit}</p>
		</div>
	)
}

export default card
