"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TokenRunner({ onComplete }: { onComplete: (tokens: number) => void }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [tokensEarned, setTokensEarned] = useState(0)
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 })
  const [tokens, setTokens] = useState<{ id: number; x: number; y: number }[]>([])
  const [obstacles, setObstacles] = useState<{ id: number; x: number; y: number; width: number; height: number }[]>([])
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const lastTokenSpawnRef = useRef<number>(0)
  const lastObstacleSpawnRef = useRef<number>(0)

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(30)
    setTokens([])
    setObstacles([])
    setPlayerPosition({ x: 50, y: 50 })
    lastTokenSpawnRef.current = 0
    lastObstacleSpawnRef.current = 0
  }

  const endGame = () => {
    setGameOver(true)
    cancelAnimationFrame(animationFrameRef.current)
    // Calculate tokens earned based on score
    const earned = Math.min(Math.floor(score / 2), 50)
    setTokensEarned(earned)
  }

  const spawnToken = (timestamp: number) => {
    if (timestamp - lastTokenSpawnRef.current > 1000) {
      // Spawn a new token every second
      lastTokenSpawnRef.current = timestamp
      const gameArea = gameAreaRef.current
      if (gameArea) {
        const maxX = gameArea.clientWidth - 30
        const maxY = gameArea.clientHeight - 30
        const newToken = {
          id: Date.now(),
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        }
        setTokens((prev) => [...prev, newToken])
      }
    }
  }

  const spawnObstacle = (timestamp: number) => {
    if (timestamp - lastObstacleSpawnRef.current > 2000) {
      // Spawn a new obstacle every 2 seconds
      lastObstacleSpawnRef.current = timestamp
      const gameArea = gameAreaRef.current
      if (gameArea) {
        const maxX = gameArea.clientWidth - 50
        const maxY = gameArea.clientHeight - 50
        const width = Math.random() * 50 + 30
        const height = Math.random() * 50 + 30
        const newObstacle = {
          id: Date.now(),
          x: Math.random() * maxX,
          y: Math.random() * maxY,
          width,
          height,
        }
        setObstacles((prev) => [...prev, newObstacle])
      }
    }
  }

  const checkCollisions = () => {
    const playerRect = {
      left: playerPosition.x,
      right: playerPosition.x + 30,
      top: playerPosition.y,
      bottom: playerPosition.y + 30,
    }

    // Check token collisions
    const collidedTokens: number[] = []
    tokens.forEach((token) => {
      const tokenRect = {
        left: token.x,
        right: token.x + 20,
        top: token.y,
        bottom: token.y + 20,
      }

      if (
        playerRect.left < tokenRect.right &&
        playerRect.right > tokenRect.left &&
        playerRect.top < tokenRect.bottom &&
        playerRect.bottom > tokenRect.top
      ) {
        collidedTokens.push(token.id)
        setScore((prev) => prev + 1)
      }
    })

    if (collidedTokens.length > 0) {
      setTokens((prev) => prev.filter((token) => !collidedTokens.includes(token.id)))
    }

    // Check obstacle collisions
    let hitObstacle = false
    obstacles.forEach((obstacle) => {
      const obstacleRect = {
        left: obstacle.x,
        right: obstacle.x + obstacle.width,
        top: obstacle.y,
        bottom: obstacle.y + obstacle.height,
      }

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        hitObstacle = true
      }
    })

    return hitObstacle
  }

  const gameLoop = (timestamp: number) => {
    if (!gameStarted || gameOver) return

    spawnToken(timestamp)
    spawnObstacle(timestamp)

    const hitObstacle = checkCollisions()
    if (hitObstacle) {
      endGame()
      return
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }

  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [gameStarted, gameOver, playerPosition])

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameStarted, gameOver])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameStarted || gameOver) return

    const gameArea = gameAreaRef.current
    if (gameArea) {
      const rect = gameArea.getBoundingClientRect()
      const x = e.clientX - rect.left - 15 // 15 is half the player width
      const y = e.clientY - rect.top - 15 // 15 is half the player height

      // Keep player within bounds
      const maxX = gameArea.clientWidth - 30
      const maxY = gameArea.clientHeight - 30
      const boundedX = Math.max(0, Math.min(x, maxX))
      const boundedY = Math.max(0, Math.min(y, maxY))

      setPlayerPosition({ x: boundedX, y: boundedY })
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Token Runner</CardTitle>
        <CardDescription>Collect tokens and avoid obstacles</CardDescription>
      </CardHeader>
      <CardContent>
        {!gameStarted && !gameOver ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Collect Tokens, Avoid Obstacles!</h3>
            <p className="mb-6 text-muted-foreground">
              Move your cursor to control the player. Collect as many tokens as possible in 30 seconds.
            </p>
            <Button onClick={startGame}>Start Game</Button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">Game Over!</h3>
            <p className="mb-4">
              You collected <strong>{score}</strong> tokens.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold mb-6">
              <Gift className="h-5 w-5 text-primary" />
              <span>You earned {tokensEarned} tokens!</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={startGame}>
                Play Again
              </Button>
              <Button onClick={() => onComplete(tokensEarned)}>Collect Tokens</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <div>
                Score: <strong>{score}</strong>
              </div>
              <div>
                Time: <strong>{timeLeft}s</strong>
              </div>
            </div>
            <div className="mb-2">
              <Progress value={(timeLeft / 30) * 100} className="h-2" />
            </div>
            <div
              ref={gameAreaRef}
              className="relative w-full h-[400px] bg-muted/50 rounded-lg overflow-hidden cursor-none"
              onMouseMove={handleMouseMove}
            >
              {/* Player */}
              <motion.div
                className="absolute w-[30px] h-[30px] bg-primary rounded-full"
                style={{ left: playerPosition.x, top: playerPosition.y }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "spring", damping: 10 }}
              />

              {/* Tokens */}
              {tokens.map((token) => (
                <motion.div
                  key={token.id}
                  className="absolute w-[20px] h-[20px] bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ left: token.x, top: token.y }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  $
                </motion.div>
              ))}

              {/* Obstacles */}
              {obstacles.map((obstacle) => (
                <motion.div
                  key={obstacle.id}
                  className="absolute bg-red-500/70 rounded-md"
                  style={{
                    left: obstacle.x,
                    top: obstacle.y,
                    width: obstacle.width,
                    height: obstacle.height,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {gameStarted && !gameOver && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={endGame}>
            End Game
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
