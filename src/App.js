
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
     let turnNumber = (this.props.turnNumber == 1 ? "X": "O");
    return (
      <>
        <button className = "square"       
          onClick={ (event) => {
            if (this.props.isGameFinished) {return};
            this.props.onClick();
            event.target.classList.add("clicked");
            } 
          } 
          
          onMouseOver = {(event) => {
              if(this.props.value || this.props.isGameFinished){return};
              let target = event.target;
              target.classList.add('hovering');
            }
          }
          
          onMouseLeave = {(event) => {
              if(this.state.value || this.props.isGameFinished){return};
              let target = event.target;
              target.classList.remove('hovering');
            }
          }          
          >
          {this.props.value || turnNumber}
        </button>
      </>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderSquare(i) {
    return (
      <Square
        index = {i}
        value={this.props.squares[i]}
        isGameFinished = {this.props.isGameFinished}
        turnNumber = {this.props.turnNumber}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <>
       <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}          
        </div>
      </>
    );
  }
}
class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<>
      <button class = "new-game-btn" onClick = {() => this.props.handleNewGame()}>{this.props.newOrRestart}</button>
    </>)
  }
}

class Gameactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<div className = "game-active">
      <p>Next player &#8594;<b>{this.props.nextPlayer}</b></p>
      <NewGame handleNewGame = {() => this.props.handleNewGame()} newOrRestart = "Restart"/>
    </div>)
  }
}

class Gameended extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<div className="game-ended">
      <p>The winner is: {}</p>
      <NewGame handleNewGame = {() => this.props.handleNewGame()} newOrRestart = "New Game"/>
    </div>)
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      turnNumber: 1,
      isGameFinished: false,
    };
  }

  handleClick = (i) => {
    if (this.state.squares[i] !== null || this.state.isGameFinished === true) {return};
    
    const squares = this.state.squares.slice();
    this.state.turnNumber === 1 ? (squares[i] = "X") : (squares[i] = "O");

    let toggledturnNumber = (this.state.turnNumber + 1) % 2;
    this.setState(
      () => ({ squares: squares, turnNumber: toggledturnNumber }), // update State
    // async stuff
    function syncFun(){
      let gameFinished = isGameEnded(this.state.squares);
      this.setState((prev) => ({ ...prev ,isGameFinished: gameFinished}));
    })    
  }

  handleNewGame = () => {
    this.setState({ squares: Array(9).fill(null), turnNumber: 1, isGameFinished: false});
    let clickedSquares = document.querySelectorAll(".clicked");
    console.log(clickedSquares);
    for (let i = 0; i < clickedSquares.length; i++){
      clickedSquares[i].classList.remove("clicked");
      clickedSquares[i].classList.remove("hovering")
    }
    console.log(clickedSquares);
  }

  render() {
    const nextPlayer = ' ' + (this.state.turnNumber === 1 ? 'X': 'O');

    return (
      <>
        <div className="all-game">
          <h1 className="title">TiczzTacToe</h1>
            <div className = "flex-box">
              <div className="game-board">
                <Board squares = {this.state.squares}
                  isGameFinished = {this.state.isGameFinished}
                  turnNumber = {this.state.turnNumber}
                  onClick={(i) => this.handleClick(i)} />
              </div>
              <div className="game-info">                
                {!this.state.isGameFinished ? 
                <Gameactive nextPlayer = {nextPlayer} handleNewGame = { () => this.handleNewGame()}/>: <Gameended  handleNewGame = {() => this.handleNewGame()} /> }
              </div>
            </div>
        </div>
      </>
    );
  }
}

export default Game;

let isGameEnded = (arrToCheck) => {
    const winningLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    let gameFinished = winningLines.some( (line) => {
      return (arrToCheck[line[0]] !== null && arrToCheck[line[0]] === arrToCheck[line[1]] && arrToCheck[line[0]] === arrToCheck[line[2]])
    })
    
    return gameFinished;
}