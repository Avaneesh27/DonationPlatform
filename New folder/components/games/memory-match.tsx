"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type MemoryCard = {
  id: number
  content: string
  flipped: boolean
  matched: boolean
}

export function MemoryMatch({ onComplete }: { onComplete: (tokens: number) => void }) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [tokensEarned, setTokensEarned] = useState<number>(0)

  const totalPairs = 6
  const baseTokens = 40

  const initializeGame = () => {
    const cardContents = ["🌍", "🌱", "💧", "🏥", "📚", "🏠"]
    const initialCards: MemoryCard[] = []

    // Create pairs of cards
    cardContents.forEach((content, index) => {
      // Add two cards with the same content
      initialCards.push({
        id: index * 2,
        content,
        flipped: false,
        matched: false,
      })
      initialCards.push({
        id: index * 2 + 1,
        content,
        flipped: false,
        matched: false,
      })
    })

    // Shuffle the cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameStarted(true)
    setGameCompleted(false)
    setTokensEarned(0)
  }

  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched
    if (cards.find((card) => card.id === id)?.flipped || cards.find((card) => card.id === id)?.matched) {
      return
    }

    // Ignore if two cards are already flipped
    if (flippedCards.length === 2) {
      return
    }

    // Flip the card
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, id])
  }

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const [firstId, secondId] = flippedCards
      const firstCard = cards.find((card) => card.id === firstId)
      const secondCard = cards.find((card) => card.id === secondId)

      if (firstCard?.content === secondCard?.content) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === firstId || card.id === secondId ? { ...card, matched: true } : card)),
        )
        setMatchedPairs((prev) => prev + 1)
        setFlippedCards([])
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => (card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  // Check if game is completed
  useEffect(() => {
    if (gameStarted && matchedPairs === totalPairs) {
      // Calculate tokens based on moves
      const earnedTokens = Math.max(baseTokens - Math.floor(moves / 2), baseTokens / 2)
      setTokensEarned(earnedTokens)
      setGameCompleted(true)
    }
  }, [matchedPairs, gameStarted, moves])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Memory Match</CardTitle>
        <CardDescription>Match pairs of cards to earn tokens</CardDescription>
      </CardHeader>
      <CardContent>
        {!gameStarted && !gameCompleted ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Match Cards, Earn Tokens!</h3>
            <p className="mb-6 text-muted-foreground">Find all matching pairs with fewer moves to earn more tokens.</p>
            <Button onClick={initializeGame}>Start Game</Button>
          </div>
        ) : gameCompleted ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">Game Completed!</h3>
            <p className="mb-4">
              You found all pairs in <strong>{moves}</strong> moves.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold mb-6">
              <Gift className="h-5 w-5 text-primary" />
              <span>You earned {tokensEarned} tokens!</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={initializeGame}>
                Play Again
              </Button>
              <Button onClick={() => onComplete(tokensEarned)}>Collect Tokens</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <div>
                Moves: <strong>{moves}</strong>
              </div>
              <div>
                Pairs: <strong>{matchedPairs}</strong>/<strong>{totalPairs}</strong>
              </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center text-3xl ${
                    card.flipped || card.matched ? "bg-primary/10 border-2 border-primary" : "bg-muted"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {(card.flipped || card.matched) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                      {card.content}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {gameStarted && !gameCompleted && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => setGameStarted(false)}>
            Quit Game
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
