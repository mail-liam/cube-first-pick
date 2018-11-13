import React, { Component } from "react"
import Pack from "./Pack"
import Scoreboard from "./Scoreboard"
import "../App.css"

class App extends Component {
  state = {
    cube: "uncommon-cube",
    pack: [],
    selected: undefined,
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:5000/get-pack/${this.state.cube}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ pack: result })
      })
      .catch(error => console.log(error))
  }

  changeCube = event => {
    console.log("Changing cube...")
    this.setState({ cube: event.target.value })
  }

  updatePick = () => {
    const selected = this.state.selected
  }

  render() {
    return (
      <div className="App">
        <select id="cube-select">
          <option value="uncommon-cube" onChange={this.changeCube}>
            Uncommon Cube
          </option>
        </select>
        <Pack pack={this.state.pack} />
        <button id="select-card" onClick={this.updatePick}>
          Pick It!
        </button>
        <hr />
        <Scoreboard />
      </div>
    )
  }
}

export default App
