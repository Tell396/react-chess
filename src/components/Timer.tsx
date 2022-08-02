import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(5)
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function decrementBlackTimer() {
    setBlackTime(prev => prev == 0 ? prev -1 : 1)
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  // Restart game
  const handleRestart = () => {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные: {blackTime}</h2>
      <h2>Белые: {whiteTime}</h2>
    </div>
  )
};

export default Timer;
