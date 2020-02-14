import React, { Component } from 'react'
import { Layout } from 'antd'
import classes from './App.module.css'

import Scanner from './containers/Scanner/Scanner'
import Navbar from './components/Navbar/Navbar'
import Credits from './components/Credits/Credits'

const { Header, Footer, Content } = Layout

class App extends Component {
	render() {
		return (
			<>
				<Layout>
					<Header className={classes.Header}>
						<Navbar />
					</Header>
					<Content className={classes.Content}>
						<Scanner />
					</Content>
					<Footer className={classes.Footer}>
						<Credits />
					</Footer>
				</Layout>
			</>
		)
	}
}

export default App
