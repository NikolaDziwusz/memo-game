"use client"

import { useEffect } from "react"
import { useGameStore } from "../store/gameStore"
import type { GameHistoryItem } from "../types"
import "../styles/GameHistory.scss"

const GameHistory = () => {
  const { gameHistory, loadGameHistory } = useGameStore()

  useEffect(() => {
    loadGameHistory()
  }, [loadGameHistory])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {gameHistory.length === 0 ? (
        <p className="no-history">No games played yet</p>
      ) : (
        <div className="history-list">
          {gameHistory.map((game: GameHistoryItem, index: number) => (
            <div key={index} className="history-item">
              <div className="history-date">{formatDate(game.date)}</div>
              <div className="history-details">
                <div className="history-difficulty">{game.difficulty}</div>
                <div className="history-stats">
                  <span>{game.attempts} attempts</span>
                  <span>{formatTime(game.duration)} time</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GameHistory

