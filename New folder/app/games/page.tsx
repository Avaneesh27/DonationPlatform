"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Gamepad2, Gift, Trophy, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GamesPage() {
  const [tokens, setTokens] = useState(350)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Earn Tokens</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium">{tokens} Tokens</div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Earn Tokens, Make a Difference</h2>
            <p className="mt-4 text-muted-foreground md:w-2/3">
              Play games, watch ads, and complete tasks to earn Stellar tokens that you can donate to causes you care
              about.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs defaultValue="games" className="w-full max-w-3xl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="games">Games</TabsTrigger>
                <TabsTrigger value="videos">Watch Videos</TabsTrigger>
                <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="games" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Token Runner",
                      description: "Run and collect tokens in this endless runner game",
                      image: "/placeholder.svg?height=200&width=400&text=Token+Runner",
                      tokens: 50,
                      time: "5 min",
                    },
                    {
                      title: "Charity Quiz",
                      description: "Test your knowledge about global causes and earn tokens",
                      image: "/placeholder.svg?height=200&width=400&text=Charity+Quiz",
                      tokens: 30,
                      time: "3 min",
                    },
                    {
                      title: "Memory Match",
                      description: "Match cards and earn tokens for every successful pair",
                      image: "/placeholder.svg?height=200&width=400&text=Memory+Match",
                      tokens: 40,
                      time: "4 min",
                    },
                    {
                      title: "Word Puzzle",
                      description: "Solve word puzzles related to charitable causes",
                      image: "/placeholder.svg?height=200&width=400&text=Word+Puzzle",
                      tokens: 35,
                      time: "5 min",
                    },
                  ].map((game, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={game.image || "/placeholder.svg"}
                            alt={game.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                            <Gamepad2 className="h-3 w-3" />
                            Game
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{game.title}</CardTitle>
                          <CardDescription>{game.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Gift className="h-4 w-4 text-primary" />
                              <span>{game.tokens} tokens</span>
                            </div>
                            <div className="text-muted-foreground">{game.time}</div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            onClick={() => {
                              // Simulate earning tokens
                              setTokens((prev) => prev + game.tokens)
                            }}
                          >
                            Play Now
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="videos" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Clean Water Initiative",
                      description: "Learn about our clean water projects in Africa",
                      image: "/placeholder.svg?height=200&width=400&text=Clean+Water",
                      tokens: 25,
                      time: "2 min",
                    },
                    {
                      title: "Education for All",
                      description: "See how your donations help children access education",
                      image: "/placeholder.svg?height=200&width=400&text=Education",
                      tokens: 20,
                      time: "1.5 min",
                    },
                    {
                      title: "Medical Aid Relief",
                      description: "Watch how medical supplies reach disaster areas",
                      image: "/placeholder.svg?height=200&width=400&text=Medical+Aid",
                      tokens: 30,
                      time: "2.5 min",
                    },
                    {
                      title: "Sponsor Message",
                      description: "Watch a message from our sponsors",
                      image: "/placeholder.svg?height=200&width=400&text=Sponsor",
                      tokens: 15,
                      time: "1 min",
                    },
                  ].map((video, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={video.image || "/placeholder.svg"}
                            alt={video.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            Video
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{video.title}</CardTitle>
                          <CardDescription>{video.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Gift className="h-4 w-4 text-primary" />
                              <span>{video.tokens} tokens</span>
                            </div>
                            <div className="text-muted-foreground">{video.time}</div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            onClick={() => {
                              // Simulate earning tokens
                              setTokens((prev) => prev + video.tokens)
                            }}
                          >
                            Watch Now
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tasks" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Tasks</CardTitle>
                    <CardDescription>Complete these tasks to earn tokens every day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Daily Check-in",
                          description: "Log in to the platform",
                          tokens: 10,
                          completed: true,
                          progress: 100,
                        },
                        {
                          title: "Share on Social Media",
                          description: "Share a campaign on your social media",
                          tokens: 25,
                          completed: false,
                          progress: 0,
                        },
                        {
                          title: "Refer a Friend",
                          description: "Invite a friend to join GiveHope",
                          tokens: 50,
                          completed: false,
                          progress: 0,
                        },
                        {
                          title: "Complete a Survey",
                          description: "Fill out a quick survey about charitable causes",
                          tokens: 30,
                          completed: false,
                          progress: 0,
                        },
                        {
                          title: "Read Impact Stories",
                          description: "Read 3 impact stories from our campaigns",
                          tokens: 15,
                          completed: false,
                          progress: 33,
                        },
                      ].map((task, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <div
                            className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${task.completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                          >
                            <Trophy className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium leading-none">{task.title}</p>
                              <div className="flex items-center gap-1">
                                <Gift className="h-4 w-4 text-primary" />
                                <span className="text-sm">{task.tokens} tokens</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            {task.progress > 0 && task.progress < 100 && (
                              <div className="pt-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>{task.progress}%</span>
                                </div>
                                <Progress value={task.progress} className="h-1.5" />
                              </div>
                            )}
                            {!task.completed && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => {
                                  // Simulate earning tokens
                                  setTokens((prev) => prev + task.tokens)
                                }}
                              >
                                Complete Task
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col items-center justify-center mt-12 bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Ready to make a difference?</h3>
            <p className="text-muted-foreground mb-4 text-center">
              Use your earned tokens to support campaigns that matter to you.
            </p>
            <Link href="/campaigns">
              <Button size="lg" className="gap-2">
                Donate Your Tokens
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
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
