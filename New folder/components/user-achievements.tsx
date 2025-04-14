import { Award, Check, Trophy } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const achievements = [
  {
    id: 1,
    title: "First Donation",
    description: "Made your first donation",
    icon: Award,
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Regular Donor",
    description: "Donate for 3 consecutive months",
    icon: Trophy,
    completed: true,
    progress: 100,
  },
  {
    id: 3,
    title: "Token Master",
    description: "Earn 5,000 tokens through games and activities",
    icon: Award,
    completed: false,
    progress: 47,
  },
  {
    id: 4,
    title: "Global Impact",
    description: "Donate to campaigns in 5 different categories",
    icon: Trophy,
    completed: false,
    progress: 60,
  },
  {
    id: 5,
    title: "Generous Heart",
    description: "Donate a total of $1,000",
    icon: Award,
    completed: false,
    progress: 80,
  },
]

export function UserAchievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Track your progress and unlock rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start space-x-4">
              <div
                className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${achievement.completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                <achievement.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="font-medium leading-none">{achievement.title}</p>
                  {achievement.completed && (
                    <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {!achievement.completed && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
