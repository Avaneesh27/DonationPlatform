"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white py-16 md:py-24">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Make a difference with every donation
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Support causes you care about, earn rewards, and track your impact in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/campaigns">
                <Button size="lg">Donate Now</Button>
              </Link>
              <Link href="/games">
                <Button variant="outline" size="lg">
                  Earn Tokens
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] w-full rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 p-6 shadow-lg"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-rose-600 mb-4">$1.2M+</div>
                <div className="text-xl font-medium">Raised for causes worldwide</div>
                <div className="mt-8 flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Education</span>
                      <span>$450K</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white overflow-hidden">
                      <div className="h-full w-[38%] rounded-full bg-rose-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Healthcare</span>
                      <span>$320K</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white overflow-hidden">
                      <div className="h-full w-[27%] rounded-full bg-rose-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Environment</span>
                      <span>$280K</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white overflow-hidden">
                      <div className="h-full w-[23%] rounded-full bg-rose-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disaster Relief</span>
                      <span>$150K</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white overflow-hidden">
                      <div className="h-full w-[12%] rounded-full bg-rose-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-rose-100/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-rose-100/30 blur-3xl"></div>
    </section>
  )
}
