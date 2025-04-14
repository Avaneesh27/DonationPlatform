"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, Globe, Award } from "lucide-react"

export function StatsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mb-4">
              <Users className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-4xl font-bold">25K+</h3>
            <p className="mt-2 text-muted-foreground">Active Donors</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mb-4">
              <Globe className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-4xl font-bold">120+</h3>
            <p className="mt-2 text-muted-foreground">Active Campaigns</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mb-4">
              <Award className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-4xl font-bold">5M+</h3>
            <p className="mt-2 text-muted-foreground">Tokens Earned</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
