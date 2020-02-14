import React from 'react'
import { Avatar } from 'antd'
import coinLogo from '../../assets/logo.png'
import classes from './Navbar.module.css'

const Navbar = () => {
	return (
		<div className={classes.Navbar}>
			<img
				src={coinLogo}
				alt='Coin Scanner Logo'
				onClick={() => {
					window.location.reload()
				}}
			/>
			<div className={classes.Actions}>
				<Avatar size='large' icon='user' />
			</div>
		</div>
	)
}

export default Navbar
