"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const campaigns = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing clean water to communities in need across Africa.",
    image: "/placeholder.svg?height=200&width=400",
    raised: 12500,
    goal: 20000,
    daysLeft: 15,
    donors: 230,
    category: "Environment",
  },
  {
    id: 2,
    title: "Education for All",
    description: "Supporting education for underprivileged children in rural areas.",
    image: "/placeholder.svg?height=200&width=400",
    raised: 8700,
    goal: 15000,
    daysLeft: 22,
    donors: 145,
    category: "Education",
  },
  {
    id: 3,
    title: "Medical Aid Relief",
    description: "Providing essential medical supplies to disaster-affected regions.",
    image: "/placeholder.svg?height=200&width=400",
    raised: 18200,
    goal: 25000,
    daysLeft: 8,
    donors: 310,
    category: "Healthcare",
  },
]

export function FeaturedCampaigns() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign, index) => (
        <motion.div
          key={campaign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                {campaign.category}
              </div>
            </div>
            <CardHeader className="flex-1">
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-muted-foreground">${campaign.goal.toLocaleString()} goal</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{campaign.donors} donors</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/campaigns/${campaign.id}`} className="w-full">
                <Button className="w-full gap-2">
                  Donate Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
