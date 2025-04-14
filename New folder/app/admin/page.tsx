"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  Bell,
  ChevronDown,
  Edit,
  Eye,
  FileText,
  Heart,
  LogOut,
  Plus,
  Settings,
  Trash2,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Heart className="h-5 w-5 text-rose-500" />
            <span>GiveHope Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/campaigns">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-muted">
                <Heart className="h-4 w-4" />
                Campaigns
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Users
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@givehope.org</div>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Heart className="h-5 w-5 text-rose-500" />
              <span>GiveHope</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </header>
        <main className="grid gap-6 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Campaign Management</h1>
            <div className="flex items-center gap-2">
              <Link href="/admin/campaigns/new">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  New Campaign
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="w-full bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                  <SelectItem value="name-az">Name (A-Z)</SelectItem>
                  <SelectItem value="name-za">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Campaigns</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">
                          <div className="flex items-center gap-1">
                            Campaign
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Category
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Progress
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Status
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            End Date
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          title: "Clean Water Initiative",
                          category: "Environment",
                          raised: 12500,
                          goal: 20000,
                          progress: 62.5,
                          status: "Active",
                          endDate: "2023-05-15",
                        },
                        {
                          id: 2,
                          title: "Education for All",
                          category: "Education",
                          raised: 8700,
                          goal: 15000,
                          progress: 58,
                          status: "Active",
                          endDate: "2023-05-22",
                        },
                        {
                          id: 3,
                          title: "Medical Aid Relief",
                          category: "Healthcare",
                          raised: 18200,
                          goal: 25000,
                          progress: 72.8,
                          status: "Active",
                          endDate: "2023-05-08",
                        },
                        {
                          id: 4,
                          title: "Wildlife Conservation",
                          category: "Environment",
                          raised: 5600,
                          goal: 12000,
                          progress: 46.7,
                          status: "Active",
                          endDate: "2023-06-10",
                        },
                        {
                          id: 5,
                          title: "Hunger Relief Program",
                          category: "Food",
                          raised: 9800,
                          goal: 15000,
                          progress: 65.3,
                          status: "Active",
                          endDate: "2023-05-30",
                        },
                      ]
                        .filter((campaign) => campaign.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.title}</TableCell>
                            <TableCell>{campaign.category}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={campaign.progress} className="h-2 w-[100px]" />
                                <span className="text-sm">{campaign.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                                {campaign.status}
                              </div>
                            </TableCell>
                            <TableCell>{campaign.endDate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>5</strong> of <strong>12</strong> campaigns
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="draft" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Draft Campaigns</CardTitle>
                  <CardDescription>Manage your unpublished campaign drafts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You have no draft campaigns.</p>
                    <Button className="mt-4 gap-1">
                      <Plus className="h-4 w-4" />
                      Create New Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Campaign</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Final Amount</TableHead>
                        <TableHead>Goal</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 6,
                          title: "School Building Project",
                          category: "Education",
                          raised: 35000,
                          goal: 30000,
                          endDate: "2023-03-15",
                        },
                        {
                          id: 7,
                          title: "Emergency Flood Relief",
                          category: "Disaster Relief",
                          raised: 22000,
                          goal: 25000,
                          endDate: "2023-02-28",
                        },
                      ]
                        .filter((campaign) => campaign.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.title}</TableCell>
                            <TableCell>{campaign.category}</TableCell>
                            <TableCell>${campaign.raised.toLocaleString()}</TableCell>
                            <TableCell>${campaign.goal.toLocaleString()}</TableCell>
                            <TableCell>{campaign.endDate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Archive
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Campaign</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          title: "Clean Water Initiative",
                          category: "Environment",
                          raised: 12500,
                          goal: 20000,
                          progress: 62.5,
                          status: "Active",
                          endDate: "2023-05-15",
                        },
                        {
                          id: 2,
                          title: "Education for All",
                          category: "Education",
                          raised: 8700,
                          goal: 15000,
                          progress: 58,
                          status: "Active",
                          endDate: "2023-05-22",
                        },
                        {
                          id: 3,
                          title: "Medical Aid Relief",
                          category: "Healthcare",
                          raised: 18200,
                          goal: 25000,
                          progress: 72.8,
                          status: "Active",
                          endDate: "2023-05-08",
                        },
                        {
                          id: 6,
                          title: "School Building Project",
                          category: "Education",
                          raised: 35000,
                          goal: 30000,
                          progress: 116.7,
                          status: "Completed",
                          endDate: "2023-03-15",
                        },
                        {
                          id: 7,
                          title: "Emergency Flood Relief",
                          category: "Disaster Relief",
                          raised: 22000,
                          goal: 25000,
                          progress: 88,
                          status: "Completed",
                          endDate: "2023-02-28",
                        },
                        {
                          id: 8,
                          title: "Community Garden",
                          category: "Environment",
                          raised: 0,
                          goal: 5000,
                          progress: 0,
                          status: "Draft",
                          endDate: "N/A",
                        },
                      ]
                        .filter((campaign) => campaign.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.title}</TableCell>
                            <TableCell>{campaign.category}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={campaign.progress} className="h-2 w-[100px]" />
                                <span className="text-sm">{campaign.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                                  campaign.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : campaign.status === "Completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {campaign.status}
                              </div>
                            </TableCell>
                            <TableCell>{campaign.endDate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>6</strong> of <strong>15</strong> campaigns
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
