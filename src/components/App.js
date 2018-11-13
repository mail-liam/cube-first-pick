import React, { Component } from "react"
import Pack from "./Pack"
import Scoreboard from "./Scoreboard"
import "../App.css"

class App extends Component {
  state = {
    cube: "uncommon-cube",
    pack: [],
    selected: undefined,
    errorMessage: false,
  }

  componentDidMount() {
    this.getPack()
  }

  changeCube = event => {
    console.log("Changing cube...")
    this.setState({ cube: event.target.value })
  }

  getPack = () => {
    fetch(`http://127.0.0.1:5000/get-pack/${this.state.cube}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ pack: result })
      })
      .catch(error => console.log(error))
  }

  selectCard = event => {
    const card = event.target
    this.removeSelected(event.target.parentElement)

    card.classList.add("selected")
    this.setState({ selected: card })
  }

  removeSelected = pack => {
    for (let child of pack.children) {
      child.classList.remove("selected")
    }
  }

  updatePick = () => {
    const selected = this.state.selected

    if (!selected) {
      this.setState({ errorMessage: true })
      return null
    }

    this.setState({ selected: undefined, errorMessage: false })
    this.getPack()
  }

  displayError = () => {
    return <p className="error">You need to select a card first!</p>
  }

  render() {
    return (
      <div className="app">
        <select id="cube-select">
          <option value="uncommon-cube" onChange={this.changeCube}>
            Uncommon Cube
          </option>
        </select>
        <Pack pack={this.state.pack} selectCard={this.selectCard} />
        <button id="select-card" onClick={this.updatePick}>
          Pick It!
        </button>
        {this.state.errorMessage ? this.displayError() : null}
        <hr />
        <Scoreboard />
      </div>
    )
  }
}

export default App
