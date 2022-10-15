import React, {useState, useEffect} from 'react';
import './styles/round-style.css'

const RoundActive = (props) => {
    let {nextTurn, handleRestart, nextMove, prevMove} = props;
    return (
    <div id = "game-active">
      <div class = "flex-item">
        <p class = "next-player">Next player: <b>{nextTurn}</b></p>
        <button id = "restart-game" onClick = {() => handleRestart()}>RESTART</button>
      </div>
      <div class = "forw-back-btn-group">
        <button class = "back-btn" onClick = {() => {prevMove()}}>&#10132;</button>
        <button class = "forw-btn" onClick = {() => {nextMove()}}>&#10132;</button>
      </div>
    </ div>
  )
}

const RoundEnded = (props) => {
  let {winner, newGame} = props;
    return (
    <div id = "game-ended">
      { winner !== "nobody" ?
        <p><em>{winner} is the winner !!</em><br></br>🥳 🥳</p>:
        <p><em>Draw:</em> nobody is the winner.<br></br>🙃 🙃</p>
      }
      <button id = "new-game" onClick = {() => newGame()}>NEW GAME</button>
    </div>
  )
    
}

export {RoundActive, RoundEnded};