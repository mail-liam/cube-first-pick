import React, { Component } from "react"
import Pack from "./Pack"
import Scoreboard from "./Scoreboard"
import "../App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <select id="cube-select">
          <option value="uncommon-cube">Uncommon Cube</option>
        </select>
        <Pack />
        <button id="select-card">Pick It!</button>
        <hr />
        <Scoreboard />
      </div>
    )
  }
}

export default App
