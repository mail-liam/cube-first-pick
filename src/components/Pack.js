import React, { Component } from "react"
import "../Pack.css"

// A collection of cards, pass cards down as props

class Pack extends Component {
  render() {
    return (
      <div className="pack">
        {this.props.pack.map(card => {
          return (
            <img
              src={`http://127.0.0.1:5000/get-image/${card}`}
              alt={`${card.replace(/_/g, " ")}`}
              className="card"
              key={card}
              onClick={this.props.selectCard}
            />
          )
        })}
      </div>
    )
  }
}

export default Pack
