import { useGameStore } from "../store/gameStore"
import Card from "./Card"
import "../styles/GameBoard.scss"

const GameBoard = () => {
  const { cards, difficulty } = useGameStore()

  return (
    <div className={`game-board difficulty-${difficulty}`} data-difficulty={difficulty}>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} imageId={card.imageId} isFlipped={card.isFlipped} isMatched={card.isMatched} />
      ))}
    </div>
  )
}

export default GameBoard

