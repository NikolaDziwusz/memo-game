"use client"

import type React from "react"

import { useGameStore } from "../store/gameStore"
import "../styles/GameControls.scss"

const GameControls = () => {
  const { startGame, resetGame, isGameStarted, isGameOver, difficulty, setDifficulty } = useGameStore()

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as "easy" | "medium" | "hard")
  }

  return (
    <div className="game-controls">
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          disabled={isGameStarted && !isGameOver}
        >
          <option value="easy">Easy (4x3)</option>
          <option value="medium">Medium (6x4)</option>
          <option value="hard">Hard (8x4)</option>
        </select>
      </div>

      <div className="game-buttons">
        {!isGameStarted ? (
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <button className="reset-button" onClick={resetGame}>
            {isGameOver ? "New Game" : "Reset Game"}
          </button>
        )}
      </div>
    </div>
  )
}

export default GameControls

