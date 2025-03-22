"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../store/gameStore"
import "../styles/GameStats.scss"

const GameStats = () => {
  const { attempts, startTime, isGameStarted, isGameOver } = useGameStore()
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let timer: number

    if (isGameStarted && !isGameOver && startTime) {
      timer = window.setInterval(() => {
        const currentTime = Date.now()
        const elapsed = Math.floor((currentTime - startTime) / 1000)
        setElapsedTime(elapsed)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isGameStarted, isGameOver, startTime])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="game-stats">
      <div className="stat-item">
        <span className="stat-label">Attempts:</span>
        <span className="stat-value">{attempts}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{formatTime(elapsedTime)}</span>
      </div>
    </div>
  )
}

export default GameStats

