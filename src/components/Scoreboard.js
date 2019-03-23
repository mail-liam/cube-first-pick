import React, { Component } from "react"
import PropTypes from "prop-types"
import "../Scoreboard.css"

// Shows the top 10 cards with the highest pick count
class Scoreboard extends Component {
  static propTypes = {
    picks: PropTypes.object,
  }

  getTopTen = picks => {
    const topTen = Object.entries(picks)
      .sort((a, b) => {
        return b[1] - a[1]
      })
      .slice(0, 10)

    return topTen.map(card => {
      return <p key={card[0]}>{`${card[0]}: ${card[1]}`}</p>
    })
  }

  render() {
    return (
      <div id="scoreboard">
        <h2>Highest Picked Cards</h2>
        {this.getTopTen(this.props.picks)}
      </div>
    )
  }
}

export default Scoreboard
