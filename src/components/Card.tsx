"use client"

import {useState, useEffect} from "react"
import {useGameStore} from "../store/gameStore"
import "../styles/Card.scss"

interface CardProps {
    id: number
    imageId: number
    isFlipped: boolean
    isMatched: boolean
}

const Card = ({id, imageId, isFlipped, isMatched}: CardProps) => {
    const {flipCard, isGameStarted} = useGameStore()
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isFlipped || isMatched) {
            setIsAnimating(true)
            const timer = setTimeout(() => setIsAnimating(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isFlipped, isMatched])

    const handleClick = () => {
        if (!isGameStarted || isFlipped || isMatched) return
        flipCard(id)
    }

    // Generate a color based on imageId for visual distinction
    const getCardColor = (id: number) => {
        const colors = [
            "#FF5252",
            "#FF4081",
            "#E040FB",
            "#7C4DFF",
            "#536DFE",
            "#448AFF",
            "#40C4FF",
            "#18FFFF",
            "#64FFDA",
            "#69F0AE",
            "#B2FF59",
            "#EEFF41",
            "#FFFF00",
            "#FFD740",
            "#FFAB40",
            "#FF6E40",
        ]
        return colors[id % colors.length]
    }

    // Generate an emoji based on imageId
    const getCardEmoji = (id: number) => {
        const emojis = [
            "🐶",
            "🐱",
            "🐭",
            "🐹",
            "🐰",
            "🦊",
            "🐻",
            "🐼",
            "🐨",
            "🐯",
            "🦁",
            "🐮",
            "🐷",
            "🐸",
            "🐵",
            "🐔",
            "🐧",
            "🐦",
            "🐤",
            "🦆",
            "🦅",
            "🦉",
            "🦇",
            "🐺",
            "🐗",
            "🐴",
            "🦄",
            "🐝",
            "🐛",
            "🦋",
            "🐌",
            "🐞",
        ]
        return emojis[id % emojis.length]
    }

    return (
        <div
            className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""} ${isAnimating ? "animating" : ""}`}
            onClick={handleClick}
            data-card-id={id}
            data-matched={isMatched}
        >
            <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back" style={{backgroundColor: getCardColor(imageId)}}>
                    <div className="card-content">
                        <span className="card-emoji">{getCardEmoji(imageId)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card

