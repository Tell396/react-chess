import React, { useState, useEffect } from 'react';

import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';

import './App.css';

function App() {
  const [board, setBoard] = useState(new Board());
  
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
