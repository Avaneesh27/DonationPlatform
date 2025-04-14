"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function TokenPaymentForm({
  amount,
  onSuccess,
}: {
  amount: string
  onSuccess: () => void
}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Convert dollar amount to tokens (1 dollar = 10 tokens for this example)
  const tokenAmount = Number.parseInt(amount) * 10
  const availableTokens = 2350 // This would come from the user's account

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate token transfer
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Notify parent component
      setTimeout(() => {
        onSuccess()
      }, 2000)
    }, 2000)
  }

  if (isComplete) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Tokens Donated!</h3>
        <p className="text-muted-foreground mb-4">
          You've successfully donated {tokenAmount} tokens. Thank you for your contribution!
        </p>
      </motion.div>
    )
  }

  const insufficientTokens = tokenAmount > availableTokens

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">Available Tokens</div>
          <div className="font-medium">{availableTokens}</div>
        </div>
        <Progress value={(availableTokens / 5000) * 100} className="h-2" />

        <Separator />

        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Token Conversion</div>
            <div className="text-sm text-muted-foreground">1 USD = 10 Tokens</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span>Tokens to donate</span>
            </div>
            <div className="font-bold text-lg">{tokenAmount}</div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Donation Summary</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Donation amount</div>
              <div>${amount}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Token equivalent</div>
              <div>{tokenAmount} tokens</div>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-medium">
              <div>Remaining tokens after donation</div>
              <div>{availableTokens - tokenAmount < 0 ? 0 : availableTokens - tokenAmount}</div>
            </div>
          </div>
        </div>
      </div>

      {insufficientTokens && (
        <div className="text-center text-red-500 text-sm">
          You don't have enough tokens for this donation. Please earn more tokens or reduce your donation amount.
        </div>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="flex-1" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isProcessing || insufficientTokens}>
          {isProcessing ? "Processing..." : "Confirm Donation"}
        </Button>
      </div>
    </form>
  )
}
