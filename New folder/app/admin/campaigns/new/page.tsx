"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Heart, ImageIcon, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function NewCampaignPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to admin</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Create New Campaign</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Publish Campaign
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                    <CardDescription>Provide the basic information about your fundraising campaign</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <FormLabel htmlFor="title">Campaign Title</FormLabel>
                      <Input id="title" placeholder="Enter a clear, descriptive title" />
                      <FormDescription>
                        Choose a title that clearly communicates the purpose of your campaign.
                      </FormDescription>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="disaster">Disaster Relief</SelectItem>
                          <SelectItem value="children">Children</SelectItem>
                          <SelectItem value="animals">Animals</SelectItem>
                          <SelectItem value="food">Food & Hunger</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Categorizing your campaign helps donors find causes they care about.
                      </FormDescription>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="goal">Fundraising Goal</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <Input id="goal" type="number" placeholder="5000" className="pl-7" />
                      </div>
                      <FormDescription>Set a realistic goal based on what you need to accomplish.</FormDescription>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="end-date">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString() : "Select an end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Choose when your campaign will end. Most campaigns run for 30-60 days.
                      </FormDescription>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <FormLabel htmlFor="short-description">Short Description</FormLabel>
                      <Textarea
                        id="short-description"
                        placeholder="Briefly describe your campaign (100-150 characters)"
                        className="resize-none"
                        rows={2}
                      />
                      <FormDescription>This will appear in campaign listings and previews.</FormDescription>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="full-description">Full Description</FormLabel>
                      <Textarea
                        id="full-description"
                        placeholder="Provide a detailed description of your campaign, its goals, and impact"
                        className="min-h-[200px]"
                      />
                      <FormDescription>
                        Tell your story in detail. Explain why this cause matters, who it will help, and how the funds
                        will be used.
                      </FormDescription>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Campaign Media</CardTitle>
                    <CardDescription>Add images and videos to make your campaign more engaging</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <FormLabel>Cover Image</FormLabel>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop an image, or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            Browse Files
                          </Button>
                        </div>
                        <Input type="file" className="hidden" />
                      </div>
                      <FormDescription>
                        Upload a high-quality image (recommended size: 1200x630 pixels).
                      </FormDescription>
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Additional Images</FormLabel>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Add up to 5 additional images to showcase your campaign
                          </p>
                          <Button variant="outline" size="sm">
                            Add Images
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="video-url">Video URL (Optional)</FormLabel>
                      <Input id="video-url" placeholder="https://youtube.com/..." />
                      <FormDescription>
                        Add a YouTube or Vimeo video URL to tell your story more effectively.
                      </FormDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Preview</CardTitle>
                      <CardDescription>See how your campaign will appear to donors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg overflow-hidden mb-4 bg-muted h-[200px] flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Your Campaign Title</h3>
                        <p className="text-sm text-muted-foreground">
                          Your campaign short description will appear here. Make it compelling!
                        </p>
                        <div className="flex justify-between text-sm mt-2">
                          <span>$0 raised</span>
                          <span className="text-muted-foreground">$0 goal</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-full w-0 bg-primary rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>0%</span>
                          <span>0 days left</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Publishing Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Campaign Status</div>
                          <div className="text-sm text-muted-foreground">Set as draft or publish immediately</div>
                        </div>
                        <Select defaultValue="draft">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Featured Campaign</div>
                          <div className="text-sm text-muted-foreground">Show on homepage and featured sections</div>
                        </div>
                        <Select defaultValue="no">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Featured" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Allow Comments</div>
                          <div className="text-sm text-muted-foreground">
                            Let donors leave comments on your campaign
                          </div>
                        </div>
                        <Select defaultValue="yes">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Comments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-rose-500 mt-0.5" />
                          <span>Tell a compelling story that connects emotionally with donors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-rose-500 mt-0.5" />
                          <span>Use high-quality images that clearly show your cause</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-rose-500 mt-0.5" />
                          <span>Set a realistic fundraising goal based on your needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-rose-500 mt-0.5" />
                          <span>Share regular updates to keep donors engaged</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-rose-500 mt-0.5" />
                          <span>Thank donors promptly and show the impact of their gifts</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline">Cancel</Button>
              <Button variant="outline">Save as Draft</Button>
              <Button className="gap-1">
                <Save className="h-4 w-4" />
                Publish Campaign
              </Button>
            </div>
          </motion.div>
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
