import { CalendarIcon, ExternalLink } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const recentDonations = [
  {
    id: 1,
    campaign: "Clean Water Initiative",
    amount: "$50.00",
    date: "2023-04-12T10:30:00Z",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    campaign: "Education for All",
    amount: "$25.00",
    date: "2023-04-08T14:15:00Z",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    campaign: "Medical Aid Relief",
    amount: "350 Tokens",
    date: "2023-04-05T09:45:00Z",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    campaign: "Wildlife Conservation",
    amount: "$75.00",
    date: "2023-03-28T16:20:00Z",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    campaign: "Hunger Relief Program",
    amount: "550 Tokens",
    date: "2023-03-20T11:10:00Z",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function UserDonationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Donations</CardTitle>
        <CardDescription>Your donation history across all campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDonations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={donation.image || "/placeholder.svg"} alt={donation.campaign} />
                  <AvatarFallback>{donation.campaign.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{donation.campaign}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(donation.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium">{donation.amount}</div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
