"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CharityQuiz } from "@/components/games/charity-quiz"
import { MemoryMatch } from "@/components/games/memory-match"
import { TokenRunner } from "@/components/games/token-runner"

export default function GamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tokens, setTokens] = useState(0)

  const handleGameComplete = (earnedTokens: number) => {
    setTokens((prev) => prev + earnedTokens)
    // In a real app, you would save this to the user's account
    setTimeout(() => {
      router.push("/games")
    }, 2000)
  }

  const renderGame = () => {
    switch (params.id) {
      case "token-runner":
        return <TokenRunner onComplete={handleGameComplete} />
      case "memory-match":
        return <MemoryMatch onComplete={handleGameComplete} />
      case "charity-quiz":
        return <CharityQuiz onComplete={handleGameComplete} />
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
            <p className="mb-6 text-muted-foreground">Sorry, the game you're looking for doesn't exist.</p>
            <Link href="/games">
              <Button>Back to Games</Button>
            </Link>
          </div>
        )
    }
  }

  const getGameTitle = () => {
    switch (params.id) {
      case "token-runner":
        return "Token Runner"
      case "memory-match":
        return "Memory Match"
      case "charity-quiz":
        return "Charity Quiz"
      default:
        return "Game"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/games">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to games</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">{getGameTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            {tokens > 0 && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Gift className="h-4 w-4" />
                <span>+{tokens} tokens</span>
              </div>
            )}
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">{renderGame()}</div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GiveHope. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
