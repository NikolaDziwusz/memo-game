"use client"

import { useEffect } from "react"
import GameBoard from "./components/GameBoard"
import GameControls from "./components/GameControls"
import GameStats from "./components/GameStats"
import GameHistory from "./components/GameHistory"
import GameCompletionModal from "./components/GameCompletionModal"
import ThemeToggle from "./components/ThemeToggle"
import { useGameStore } from "./store/gameStore"
import "./styles/App.scss"

const App = () => {
  const { isGameStarted, isGameOver, checkGameOver } = useGameStore()

  useEffect(() => {
    if (isGameStarted && !isGameOver) {
      const interval = setInterval(() => {
        checkGameOver()
      }, 500)

      return () => clearInterval(interval)
    }
  }, [isGameStarted, isGameOver, checkGameOver])

  return (
    <div className="app-container">
      <ThemeToggle />

      <h1>Memory Card Game</h1>

      <div className="game-layout">
        <div className="game-main">
          <GameStats />
          <GameBoard />
          <GameControls />
        </div>

        <div className="game-sidebar">
          <GameHistory />
        </div>
      </div>

      <GameCompletionModal />
    </div>
  )
}

export default App

