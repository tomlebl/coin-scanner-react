import React, { Component } from 'react'
import Cards from './components/Cards/Cards'
import './App.css'

class App extends Component {
   state = {
      cards: [
         {
            id: 't-mcap',
            title: 'Total market cap',
            value: `${200} B $`
         },
         {
            id: 't-vol',
            title: '24h volume',
            value: `${53} B $`
         },
         {
            id: 'btc-dom',
            title: 'Bitcoin dominance',
            value: `${65} %`
         },
         {
            id: 'avg-change',
            title: 'Average change',
            value: `${1.35} %`
         },
         {
            id: 'vol-change',
            title: 'Volume change',
            value: `${5.1} B $%`
         }
      ]
   }

   deleteCardHandler = (cardIndex) => {
      const cards = [...this.state.cards]
      cards.splice(cardIndex, 1)
      this.setState({ cards: cards })
   }

   render() {
      return (
         <div className='App'>
                       <h1>Coin Scanner</h1>
            <div className='container-cards'>
               <Cards cardsData={this.state.cards} clicked={this.deleteCardHandler} />
            </div>
         </div>
      )
   }
}

export default App
