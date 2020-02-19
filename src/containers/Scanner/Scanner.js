import React, { Component } from 'react'
import Cards from '../../components/Cards/Cards'
import SpanChangeDeco from '../../components/SpanChangeDeco/SpanChangeDeco'
import MarketDataUnit from '../../components/MarketDataUnit/MarketDataUnit'
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { Table } from 'antd'
import { Input } from 'antd'
import { Modal } from 'antd'
import axios from '../../axios-coinLore'
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
		coinsData: [],
		tableData: [],
		tableLoading: true,
		pageSize: 10,
		totalCoins: 100
	}

	componentDidMount() {
		axios
			.get('/global/ ')
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
				this.errorHandler(err)
			})

		axios
			.get('/tickers/')
			.then(res => {
				const tableData = res.data.data.map((element, index) => {
					return { ...element, key: index }
				})

				this.setState({ coinsData: tableData, tableData: tableData, tableLoading: false })
			})
			.catch(err => {
				this.errorHandler(err)
			})
	}

	deleteCardHandler = cardIndex => {
		const cards = [...this.state.cards]
		cards[cardIndex].show = false
		this.setState({ cards: cards })
	}

	searchHandler = input => {
		const coins = [...this.state.coinsData]
		const filteredCoins = coins.filter(
			coin =>
				coin.name.toLowerCase().includes(input.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(input.toLowerCase())
		)
		this.setState({ tableData: filteredCoins, totalCoins: filteredCoins.length })
	}

	onShowSizeChange = (_, pageSize) => {
		this.setState({ pageSize: pageSize })
	}

	errorHandler = err => {
		Modal.error({
			title: 'Error message',
			content: `${err} ; Likely Bad HTTP request`
		})
	}

	render() {
		const columns = [
			{
				title: 'Rank',
				dataIndex: 'rank',
				key: 'rank',
				sorter: (a, b) => a.rank - b.rank
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
				render: text => <SpanChangeDeco text={text} />,
				sorter: (a, b) => a.percent_change_1h - b.percent_change_1h
			},
			{
				title: '24h',
				dataIndex: 'percent_change_24h',
				key: '24h',
				render: text => <SpanChangeDeco text={text} />,
				sorter: (a, b) => a.percent_change_24h - b.percent_change_24h
			},
			{
				title: '7d',
				dataIndex: 'percent_change_7d',
				key: '7d',
				render: text => <SpanChangeDeco text={text} />,
				sorter: (a, b) => a.percent_change_7d - b.percent_change_7d
			},
			{
				title: '24h Volume',
				dataIndex: 'volume24',
				key: 'volume24',
				render: text => <MarketDataUnit data={text} />,
				sorter: (a, b) => a.volume24 - b.volume24
			},
			{
				title: 'Market Cap',
				dataIndex: 'market_cap_usd',
				key: 'm-cap',
				render: text => <MarketDataUnit data={text} />
			},
			{
				title: 'Circulating Supply',
				dataIndex: 'csupply',
				key: 'circ-sup',
				render: text => <MarketDataUnit data={text} />
			}
		]

		const { Search } = Input
		return (
			<>
				<Cards cardsData={this.state.cards} clicked={this.deleteCardHandler} />
				<div className={classes.Search}>
					<Search
						placeholder='Search Coins'
						onChange={e => this.searchHandler(e.target.value)}
						style={{ width: 300 }}
						size='large'
					/>
				</div>

				<Table
					columns={columns}
					dataSource={this.state.tableData}
					style={{ margin: '10px 50px' }}
					loading={this.state.tableLoading}
					pagination={{
						pageSize: this.state.pageSize,
						showSizeChanger: true,
						pageSizeOptions: ['10', '25', '50', '100'],
						total: this.state.totalCoins,
						onShowSizeChange: this.onShowSizeChange
					}}
				/>
			</>
		)
	}
}

export default Scanner
