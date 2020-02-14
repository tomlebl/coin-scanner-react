import React, { Component } from 'react'
import Cards from '../../components/Cards/Cards'
import { Table } from 'antd'
import axios from 'axios'
import classes from './Scanner.module.css'

class Scanner extends Component {
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
		],
		tableData: []
	}

	componentDidMount() {
		axios
			.get('https://api.coinlore.net/api/global/ ')
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

		axios
			.get('https://api.coinlore.net/api/tickers/')
			.then(res => {
				const tableData = res.data.data.map((element, index) => {
					return { ...element, key: index }
				})
				console.log(tableData)
				this.setState({ tableData: tableData })
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
		const columns = [
			{
				title: 'Rank',
				dataIndex: 'rank',
				key: 'rank'
			},
			{
				title: 'Coin',
				dataIndex: 'name',
				key: 'coin',
				render: (text, record) => {
					return (
						<div className={classes.Coin}>
							<img
								src={`/images/coins/${record.symbol}.png`}
								alt='coin logo'
								height='30px'
							/>
							{text} <span>[{record.symbol}]</span>
						</div>
					)
				}
			},
			{
				title: 'Price',
				dataIndex: 'price_usd',
				key: 'price',
				render: text => <span>$ {text}</span>
			},
			{
				title: '1h',
				dataIndex: 'percent_change_1h',
				key: '1h',
				render: text => {
					const assignedClasses = [classes.Change]
					if (Number(text) < 0) {
						assignedClasses.push(classes.Red)
					} else if (Number(text) > 0) {
						assignedClasses.push(classes.Green)
					}
					return <span className={assignedClasses.join(' ')}>{text} %</span>
				}
			},
			{
				title: '24h',
				dataIndex: 'percent_change_24h',
				key: '24h'
			},
			{
				title: '7d',
				dataIndex: 'percent_change_7d',
				key: '7d'
			},
			{
				title: '24h Volume',
				dataIndex: 'volume24',
				key: 'volume24'
			},
			{
				title: 'Market Cap',
				dataIndex: 'market_cap_usd',
				key: 'm-cap'
			},
			{
				title: 'Circulating Supply',
				dataIndex: 'csupply',
				key: 'circ-sup'
			}
		]

		return (
			<>
				<Cards cardsData={this.state.cards} clicked={this.deleteCardHandler} />
				<Table
					columns={columns}
					dataSource={this.state.tableData}
					bordered={true}
					style={{ margin: '10px 50px' }}
				/>
			</>
		)
	}
}

export default Scanner
