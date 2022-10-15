import React, {useState, useEffect} from 'react';
import './styles/board.css';

const Square = (props) => {
    const {index, squaresArr, handleSquareClick, nextTurn, winner} = props;
    return (
        <button class = "square" onClick = {() => {if(squaresArr[index] || winner){return}; handleSquareClick()}}>
            {squaresArr[index] || (!winner && <div class = "hover-X-O">{nextTurn}</div>)}
        </button>
    )
}

const Board = (props) => {
    const {squaresArr, handleSquareClick, nextTurn, winner} = props;
    function renderSquare(i) {
        return <Square squaresArr = {squaresArr} index = {i - 1} handleSquareClick = {() => handleSquareClick(i - 1)} nextTurn = {nextTurn} winner = {winner}/>;
    }
    return (
        <>
         {renderSquare(1)}
         {renderSquare(2)}
         {renderSquare(3)}
         {renderSquare(4)}
         {renderSquare(5)}
         {renderSquare(6)}
         {renderSquare(7)}
         {renderSquare(8)}
         {renderSquare(9)}            
        </>
    )
}

export default Board;  



