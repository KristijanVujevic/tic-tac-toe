import React, { createContext, useState } from "react";
import "./App.css";

import Tema from "./Components/tema";
export const Theme = createContext("light");
const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [theme, setTheme] = useState("dark");

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winnerInfo = calculateWinner(newBoard);

    if (winnerInfo) {
      // Handle the case when there is a winner
      winnerInfo.winner === "X" ? setXWins(xWins + 1) : setOWins(oWins + 1);
      setTimeout(() => {
        alert(`Player ${winnerInfo.winner} wins!`);
        resetGame(); // Reset the game state after a short delay
      }, 1000);
    } else if (newBoard.every((square) => square !== null)) {
      // Check for a draw after checking for a winner
      alert("It's a draw!");
      resetGame(); // Reset the game state
    }
  };

  const renderSquare = (index) => {
    const isWinnerSquare =
      calculateWinner(board) && calculateWinner(board).line.includes(index);
    return (
      <button
        className={`square ${isWinnerSquare ? "winner" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const winnerInfo = calculateWinner(board);
  const status = winnerInfo
    ? `Winner: ${winnerInfo.winner}`
    : board.every((square) => square !== null)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className={`${theme} App`}>
      <Theme.Provider value={[theme, setTheme]}>
        <h1>Tic-Tac-Toe</h1>
        <div className="status">{status}</div>
        <div className="board">
          <div className="row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="scoreboard">
          <p>Player X wins: {xWins}</p>
          <p>Player O wins: {oWins}</p>
        </div>
        <Tema />
      </Theme.Provider>
    </div>
  );
};

export default App;
