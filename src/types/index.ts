export interface Card {
  id: number
  imageId: number
  isFlipped: boolean
  isMatched: boolean
}

export type Difficulty = "easy" | "medium" | "hard"

export interface GameState {
  cards: Card[]
  flippedCards: number[]
  attempts: number
  startTime: number | null
  endTime: number | null
  isGameStarted: boolean
  isGameOver: boolean
  difficulty: Difficulty
  gameHistory: GameHistoryItem[]
  soundEnabled: boolean
}

export interface GameHistoryItem {
  attempts: number
  duration: number
  date: number
  difficulty: Difficulty
}

