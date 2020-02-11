import React, { Component } from 'react'
import Cards from './components/Cards/Cards'
import './App.css'
import axios from 'axios'

class App extends Component {
	state = {
		cards: [
			{
				id: 't-mcap',
				value: null,
				show: true
			},
			{
				id: 't-vol',
				value: null,
				show: true
			},
			{
				id: 'btc-dom',
				value: null,
				show: true
			},
			{
				id: 'avg-change',
				value: null,
				show: true
			},
			{
				id: 'vol-change',
				value: null,
				show: true
			}
		]
	}

	componentDidMount() {
		axios
			.get('https://api.coinlore.com/api/global/')
			.then(response => {
				const { total_mcap, total_volume, btc_d, mcap_change, volume_change } = response.data[0]
				const updatedCards = [...this.state.cards]
				updatedCards[0].value = (total_mcap / 1e9).toFixed(2)
				updatedCards[1].value = (total_volume / 1e9).toFixed(2)
				updatedCards[2].value = btc_d
				updatedCards[3].value = mcap_change
				updatedCards[4].value = volume_change

				this.setState({ cards: updatedCards })
			})
			.catch(err => {
				console.log(err)
			})
	}

	deleteCardHandler = cardIndex => {
		const cards = [...this.state.cards]
		cards[cardIndex].show = false
		this.setState({ cards: cards })
	}

	render() {
		return (
			<div className='App'>
				<h1>Coin Scanner</h1>
				<Cards cardsData={this.state.cards} clicked={this.deleteCardHandler} />
			</div>
		)
	}
}

export default App
