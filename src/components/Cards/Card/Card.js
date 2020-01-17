import React from 'react'
import classes from './Card.module.css'

const card = props => {
   let cardClass = ''

   switch (props.id) {
      case 't-mcap':
         cardClass = classes.mcap
         break
      case 't-vol':
         cardClass = classes.vol
         break
      case 'btc-dom':
         cardClass = classes.dom
         break
      case 'avg-change':
         cardClass = classes.avgChange
         break
      case 'vol-change':
         cardClass = classes.volChange
         break
      default:
         cardClass = 'classes.default'
   }

   return (
      <div className={classes.card} onClick={props.click}>
         <h5 className={cardClass}>{props.title}</h5>
         <p className={cardClass}>{props.value}</p>
      </div>
   )
}

export default card
