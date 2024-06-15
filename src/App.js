import React, { useState } from "react";
import "./index.css";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState("X");

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[square] = nextValue;
    setSquares(newSquares);
    setNextValue(nextValue === "X" ? "O" : "X");
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue("X");
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div>{status}</div>
      <div id="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

function Game() {
  return (
    <div>
      <Board />
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
