import React, { Component } from "react"
import { firebaseApp } from "../base"

class Card extends Component {
  state = { url: "" }

  componentDidMount() {
    let imageRef = firebaseApp
      .storage()
      .ref(`/card_images/${this.props.card.replace(/ /g, "_")}.jpg`)

    imageRef.getDownloadURL().then(url => this.setState({ url: url }))
  }

  render() {
    return (
      <img
        src={this.state.url}
        alt={this.props.card}
        className="card"
        onClick={this.props.selectCard}
      />
    )
  }
}

export default Card
