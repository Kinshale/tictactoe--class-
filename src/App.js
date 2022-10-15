import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import {RoundActive, RoundEnded} from './roundinfo';
import './styles/styles.css';

function Game() {
const [currentSquaresArr, setcurrentSquaresArr] = useState(Array(9).fill(null));
const [historyOfSquares, setHistoryOfSquares] = useState([]);
const [currentPositionGame, setcurrentPositionGame] = useState(-1);
const [nextTurn, setNextTurn] = useState('X');
const [winner, setWinner] = useState(null);

const handleSquareClick = (squareIndex) => {
  
  let newSquares = [...currentSquaresArr];
  newSquares[squareIndex] = nextTurn;

  setcurrentSquaresArr(newSquares);
  
  setNextTurn((turn) => turn === 'X' ? 'O': 'X'); 

  setcurrentPositionGame((count) => count + 1);

  setHistoryOfSquares(
    function(prev){
      let newHistorySquares = [...prev];
      newHistorySquares.splice(currentPositionGame + 1);
      newHistorySquares.push(newSquares);
      return newHistorySquares;
    }
  )

  declareWinner(newSquares);
}

const handleRestart = () => {
  setcurrentSquaresArr(Array(9).fill(null));
  setHistoryOfSquares([]);
  setcurrentPositionGame(-1);
  setNextTurn('X');
  setWinner(null);
}

const nextMove = () => {
  if(currentPositionGame + 1 == historyOfSquares.length){return};
  setcurrentSquaresArr(historyOfSquares[currentPositionGame + 1]);
  setcurrentPositionGame((count) => count + 1);
  setNextTurn((turn) => turn === 'X' ? 'O': 'X');
}

const prevMove = () => {
  if(currentPositionGame < 0){return};
  if(currentPositionGame !== 0){
    setcurrentSquaresArr(historyOfSquares[currentPositionGame - 1]);
  } else {
    setcurrentSquaresArr(Array(9).fill(null));
  }
  
  setcurrentPositionGame((count) => count - 1);
  setNextTurn((turn) => turn === 'X' ? 'O': 'X'); 
}

const declareWinner = (squaresToCheck) => {
  
  let lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  let winner = null;

  for(let i = 0; i < lines.length; i++){
    let [a,b,c] = lines[i];

    if(squaresToCheck[a] && squaresToCheck[a] == squaresToCheck[b] && squaresToCheck[a] == squaresToCheck[c] ){
      winner = squaresToCheck[a];      
      break;
    }
  }
  
  if(winner === null && squaresToCheck.every( (elem) => Boolean(elem) )) {
    winner = "nobody"
  }

  setWinner(() => {
    return winner;
  })
}

  return (
    <>
      <div class = "grid-container">
        <div class="TicTacToeTitle"><h1>TicTacToe</h1></div>
        <div class="Board">
          <Board squaresArr = {currentSquaresArr} handleSquareClick = {(i) => handleSquareClick(i)} nextTurn = {nextTurn} winner = {winner}/>
        </div>
        <div class="GameInfo">{winner ? <RoundEnded winner = {winner} newGame = {() => handleRestart()}/> :<RoundActive nextTurn = {nextTurn} handleRestart = {() => handleRestart()} nextMove = {() => nextMove()} prevMove = {() => prevMove()}/>}</div>
      </div>
    </>
  )
}

export default Game;
