import React, { Component } from "react"
import "../Pack.css"

// A collection of cards, pass cards down as props

class Pack extends Component {
  render() {
    return (
      <div className="Pack">
        {this.props.pack.map(card => {
          return (
            <img
              src={`http://127.0.0.1:5000/get-image/${card}`}
              alt={`${card.replace("_", " ")}`}
              className="card"
              key={card}
            />
          )
        })}
      </div>
    )
  }
}

export default Pack
