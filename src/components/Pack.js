import React, { Component } from "react"
import Card from "./Card"
import "../Pack.css"

// A collection of cards, pass cards down as props

class Pack extends Component {
  render() {
    return (
      <div className="pack">
        {this.props.pack.map(card => {
          return (
            <Card card={card} selectCard={this.props.selectCard} key={card} />
          )
        })}
      </div>
    )
  }
}

export default Pack
