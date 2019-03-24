import React, { Component } from "react"
import base from "../base"
import Pack from "./Pack"
import Scoreboard from "./Scoreboard"
import "../App.css"

class App extends Component {
  state = {
    cube: "uncommon_cube",
    pack: [],
    selected: undefined,
    errorMessage: false,
    picks: {},
  }

  componentDidMount() {
    this.syncPicks()
    this.getPack()
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  changeCube = event => {
    this.setState({ cube: event.target.value }, () => {
      this.syncPicks()
      this.getPack()
    })
  }

  syncPicks = () => {
    this.ref = base.syncState(`${this.state.cube}/picks`, {
      context: this,
      state: "picks",
    })
  }

  getPack = () => {
    fetch(
      `https://us-central1-cube-first-pick.cloudfunctions.net/getPack?cube=${
        this.state.cube
      }`,
      {
        method: "GET",
      }
    )
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

    const cardName = selected.alt
    const oldPicks = this.state.picks
    oldPicks[cardName] = oldPicks[cardName] + 1 || 1
    this.setState({ selected: undefined, errorMessage: false, picks: oldPicks })
    this.getPack()
  }

  render() {
    // console.log(this.state.picks)
    return (
      <div className="app">
        <select id="cube-select" onChange={this.changeCube}>
          <option value="uncommon_cube">Uncommon Cube</option>
          <option value="stevens_pauper_cube">Steven's Pauper Cube</option>
        </select>
        <Pack pack={this.state.pack} selectCard={this.selectCard} />
        <div id="select-wrapper">
          <button id="select-card" onClick={this.updatePick}>
            Pick It!
          </button>
          {this.state.errorMessage ? (
            <p className="error">You need to select a card first!</p>
          ) : null}
        </div>
        {this.state.picks ? <Scoreboard picks={this.state.picks} /> : null}
      </div>
    )
  }
}

export default App
