import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
    createNewBoard() {
        const board = [
            null, null, null, 
            null, null, null,
            null, null, null
        ];
        const player = 'X';
        const winIndices = null;
        this.setState({ board, player, winIndices });
    }

    componentWillMount() {
        this.createNewBoard();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameNumber !== this.props.gameNumber) {
            this.createNewBoard();
        }
    }

    setBoardValue = (index) => {
        const board = this.state.board;
        if (this.state.winIndices || board[index] !== null) {
            return;
        }

        board[index] = this.state.player;
        const player = this.state.player !== 'X' ? 'X' : 'O';

        this.setState({ board, player });
        this.checkWinner();
    }

    checkThree(i, j, k) {
        const board = this.state.board;

        if (!this.state.winIndices && board[i] && board[i] === board[j] && board[j] === board[k]) {
            this.setState({ winIndices: [i, j, k] });
        }
    }

    checkRows() {
        for (let i=0; i<9; i+=3) {
            this.checkThree(i, i+1, i+2);
        }
    }

    checkColumns() {
        for (let i=0; i<3; i++) {
            this.checkThree(i, i+3, i+6);
        }
    }

    checkFirstDiagonal() {
        this.checkThree(0, 4, 8);
    }

    checkSecondDiagonal() {
        this.checkThree(2, 4, 6);
    }

    checkWinner() {
        this.checkRows();
        this.checkColumns();
        this.checkFirstDiagonal();
        this.checkSecondDiagonal();
    }

    renderCell(cell, index) {
        let winnerClass = '';
        if (this.state.winIndices && this.state.winIndices.indexOf(index) > -1) {
            winnerClass = 'Board-cell--winner';
        }

        return (
            <div 
                className={`Board-cell ${winnerClass}`}
                key={index}
                onClick={() => this.setBoardValue(index)}
            >
                {this.state.board[index]}
            </div>
        );
    }

    renderTable() {
        return (
            <div className='Board-table'>
                {this.state.board.map((cell, index) => this.renderCell(cell, index))}
            </div>
        );
    }

    render() {
        return (
            <div className='Board-container'>
                <h2>Game: { this.props.gameNumber }</h2>
                <h3>Current player: { this.state.player }</h3>
                {this.renderTable()}
            </div>
        );
    }
}

export default Board;