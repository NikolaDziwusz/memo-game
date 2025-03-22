"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../store/gameStore"
import "../styles/GameCompletionModal.scss"

const GameCompletionModal = () => {
  const { isGameOver, attempts, startTime, endTime, difficulty, resetGame } = useGameStore()
  const [isVisible, setIsVisible] = useState(false)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (isGameOver && startTime && endTime) {
      setDuration(Math.floor((endTime - startTime) / 1000))
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isGameOver, startTime, endTime])

  const handlePlayAgain = () => {
    resetGame()
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isVisible) return null

  return (
    <div className="modal-overlay">
      <div className="completion-modal">
        <div className="confetti-animation"></div>
        <h2>Congratulations!</h2>
        <p className="completion-message">You've completed the game!</p>

        <div className="completion-stats">
          <div className="stat-item">
            <span className="stat-label">Difficulty</span>
            <span className="stat-value difficulty">{difficulty}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Attempts</span>
            <span className="stat-value">{attempts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="play-again-btn" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameCompletionModal

