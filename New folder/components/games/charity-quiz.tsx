"use client"

import { useState } from "react"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

export function CharityQuiz({ onComplete }: { onComplete: (tokens: number) => void }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [tokensEarned, setTokensEarned] = useState(0)

  const questions: Question[] = [
    {
      id: 1,
      text: "What percentage of the global population lacks access to clean drinking water?",
      options: ["5%", "10%", "25%", "40%"],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "Which of these is NOT one of the United Nations Sustainable Development Goals?",
      options: ["Zero Hunger", "Quality Education", "Universal Basic Income", "Climate Action"],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: "Approximately how many children worldwide do not have access to primary education?",
      options: ["10 million", "58 million", "100 million", "258 million"],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: "Which disease has been completely eradicated globally through vaccination efforts?",
      options: ["Polio", "Smallpox", "Malaria", "Tuberculosis"],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: "What percentage of food produced globally is wasted each year?",
      options: ["5-10%", "15-20%", "25-30%", "30-40%"],
      correctAnswer: 3,
    },
  ]

  const startQuiz = () => {
    setQuizStarted(true)
    setQuizCompleted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setCorrectAnswers(0)
    setTokensEarned(0)
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers((prev) => prev + 1)
    }

    // Move to next question or end quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz completed
      const earned = Math.floor((correctAnswers / questions.length) * 30)
      setTokensEarned(earned)
      setQuizCompleted(true)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Charity Quiz</CardTitle>
        <CardDescription>Test your knowledge about global causes</CardDescription>
      </CardHeader>
      <CardContent>
        {!quizStarted && !quizCompleted ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Test Your Knowledge!</h3>
            <p className="mb-6 text-muted-foreground">
              Answer questions about global causes and earn tokens for correct answers.
            </p>
            <Button onClick={startQuiz}>Start Quiz</Button>
          </div>
        ) : quizCompleted ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
            <p className="mb-4">
              You got <strong>{correctAnswers}</strong> out of <strong>{questions.length}</strong> questions correct.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold mb-6">
              <Gift className="h-5 w-5 text-primary" />
              <span>You earned {tokensEarned} tokens!</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={startQuiz}>
                Try Again
              </Button>
              <Button onClick={() => onComplete(tokensEarned)}>Collect Tokens</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <div>
                Question <strong>{currentQuestionIndex + 1}</strong> of <strong>{questions.length}</strong>
              </div>
              <div>
                Correct: <strong>{correctAnswers}</strong>
              </div>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2 mb-6" />

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
              <RadioGroup value={selectedAnswer?.toString()} className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      onClick={() => handleAnswerSelect(index)}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full">
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        )}
      </CardContent>
      {quizStarted && !quizCompleted && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => setQuizCompleted(true)}>
            Quit Quiz
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
