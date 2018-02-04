import React, { Component } from 'react';
import Board from './components/Board';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    gameNumber: 0
  }

  startGame = () => {
    const gameNumber = this.state.gameNumber + 1;
    this.setState({ gameNumber });
  }

  renderBoard = () => {
    return <Board gameNumber={this.state.gameNumber} />;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tic-Tac-Toe game</h1>
          <button className="App-startButton" onClick={this.startGame}>NEW GAME</button>
        </header>
        { this.renderBoard() }
      </div>
    );
  }
}

export default App;
