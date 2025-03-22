import { create } from "zustand"
import type { Card, GameState, GameHistoryItem, Difficulty } from "../types"

const DIFFICULTY_CONFIG = {
  easy: { rows: 3, cols: 4 },
  medium: { rows: 4, cols: 6 },
  hard: { rows: 4, cols: 8 },
}

const createInitialState = (difficulty: Difficulty): GameState => ({
  cards: [],
  flippedCards: [],
  attempts: 0,
  startTime: null,
  endTime: null,
  isGameStarted: false,
  isGameOver: false,
  difficulty,
  gameHistory: [],
  soundEnabled: true,
})

export const useGameStore = create<
  GameState & {
    startGame: () => void
    resetGame: () => void
    flipCard: (id: number) => void
    checkGameOver: () => void
    setDifficulty: (difficulty: Difficulty) => void
    loadGameHistory: () => void
    saveGameToHistory: () => void
    toggleSound: () => void
  }
>((set, get) => ({
  ...createInitialState("medium"),

  startGame: () => {
    const { difficulty } = get()
    const { rows, cols } = DIFFICULTY_CONFIG[difficulty]
    const totalCards = rows * cols
    const pairsCount = totalCards / 2

    // Create pairs of cards
    const cardPairs: Card[] = []
    for (let i = 0; i < pairsCount; i++) {
      // Create two cards with the same imageId
      cardPairs.push(
        { id: i * 2, imageId: i, isFlipped: false, isMatched: false },
        { id: i * 2 + 1, imageId: i, isFlipped: false, isMatched: false },
      )
    }

    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5)

    set({
      cards: shuffledCards,
      flippedCards: [],
      attempts: 0,
      startTime: Date.now(),
      endTime: null,
      isGameStarted: true,
      isGameOver: false,
    })
  },

  resetGame: () => {
    const { isGameStarted, isGameOver } = get()

    // If the game was started and not over, save it to history
    if (isGameStarted && !isGameOver) {
      get().saveGameToHistory()
    }

    set({
      ...createInitialState(get().difficulty),
      gameHistory: get().gameHistory,
      soundEnabled: get().soundEnabled,
    })
  },

  flipCard: (id: number) => {
    const { cards, flippedCards, attempts } = get()

    // If already two cards flipped, return
    if (flippedCards.length >= 2) return

    // Find the card to flip
    const newCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))

    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, id]

    set({ cards: newCards, flippedCards: newFlippedCards })

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards.find((card) => card.id === firstId)
      const secondCard = newCards.find((card) => card.id === secondId)

      // Increment attempts
      set({ attempts: attempts + 1 })

      // Check if cards match
      if (firstCard && secondCard && firstCard.imageId === secondCard.imageId) {
        // Match found
        setTimeout(() => {
          set((state) => ({
            cards: state.cards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true, isFlipped: false } : card,
            ),
            flippedCards: [],
          }))
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          set((state) => ({
            cards: state.cards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card,
            ),
            flippedCards: [],
          }))
        }, 1000)
      }
    }
  },

  checkGameOver: () => {
    const { cards, isGameOver } = get()

    if (isGameOver) return

    // Check if all cards are matched
    const allMatched = cards.length > 0 && cards.every((card) => card.isMatched)

    if (allMatched) {
      set({ isGameOver: true, endTime: Date.now() })
      get().saveGameToHistory()
    }
  },

  setDifficulty: (difficulty: Difficulty) => {
    set({ difficulty })
  },

  loadGameHistory: () => {
    try {
      const historyString = localStorage.getItem("memoryGameHistory")
      if (historyString) {
        const history = JSON.parse(historyString) as GameHistoryItem[]
        set({ gameHistory: history })
      }
    } catch (error) {
      console.error("Failed to load game history:", error)
    }
  },

  saveGameToHistory: () => {
    const { attempts, startTime, difficulty, gameHistory } = get()
    const endTime = Date.now()

    if (!startTime) return

    const duration = Math.floor((endTime - startTime) / 1000)

    const gameRecord: GameHistoryItem = {
      attempts,
      duration,
      date: endTime,
      difficulty,
    }

    const updatedHistory = [gameRecord, ...gameHistory].slice(0, 10) // Keep only the last 10 games

    try {
      localStorage.setItem("memoryGameHistory", JSON.stringify(updatedHistory))
      set({ gameHistory: updatedHistory })
    } catch (error) {
      console.error("Failed to save game history:", error)
    }
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }))
  },
}))

