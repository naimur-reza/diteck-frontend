"use client"

import {
  BookOpen,
  Briefcase,
  ChevronDown,
  Clock,
  MessageSquare,
  Search,
  Star,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGetDashboardAnalyticsQuery } from "@/redux/api/adminApi/dashboardApi/dashboardApi"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
// import { Activity } from "./_components/ActivityChart"

// Format minutes to hours and minutes
function formatResponseTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

export default function Dashboard() {
  const { data: dashboardData } = useGetDashboardAnalyticsQuery(undefined);

  return (

    <div className="flex min-h-screen bg-muted/40">

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <form className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[300px]"
                />
              </div>
            </form>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                This Week
              </Button>
              <Button variant="outline" size="sm">
                This Month
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Dashboard Statistics</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {/* Job Applications Card */}
              {dashboardData?.data?.jobApplication && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.data?.jobApplication?.totalApplications ?? 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Total applications received</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Pending</span>
                        <span className="font-medium">
                          {dashboardData?.data?.jobApplication?.totalPending ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.jobApplication?.totalApplications ?? 0) > 0
                            ? ((dashboardData?.data?.jobApplication?.totalPending ?? 0) /
                              (dashboardData?.data?.jobApplication?.totalApplications ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Shortlisted</span>
                        <span className="font-medium">
                          {dashboardData?.data?.jobApplication?.totalShortlisted ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.jobApplication?.totalApplications ?? 0) > 0
                            ? ((dashboardData?.data?.jobApplication?.totalShortlisted ?? 0) /
                              (dashboardData?.data?.jobApplication?.totalApplications ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}


              {/* Users Card */}
              {dashboardData?.data?.user && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.data?.user?.totalUsers ?? 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Total registered users</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Active Users</span>
                        <span className="font-medium">
                          {dashboardData?.data?.user?.totalActiveUsers ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.user?.totalUsers ?? 0) > 0
                            ? ((dashboardData?.data?.user?.totalActiveUsers ?? 0) /
                              (dashboardData?.data?.user?.totalUsers ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Inactive Users</span>
                        <span className="font-medium">
                          {dashboardData?.data?.user?.totalInactiveUsers ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.user?.totalUsers ?? 0) > 0
                            ? ((dashboardData?.data?.user?.totalInactiveUsers ?? 0) /
                              (dashboardData?.data?.user?.totalUsers ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}


              {/* Reviews Card */}
              {dashboardData?.data?.review && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.data?.review?.totalReviews ?? 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Total reviews received</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Average Rating</span>
                        <span className="flex items-center font-medium">
                          {dashboardData?.data?.review?.avgStarRating ?? 0}
                          <Star className="ml-1 h-3 w-3 fill-current text-yellow-500" />
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.review?.avgStarRating ?? 0) > 0
                            ? ((dashboardData?.data?.review?.avgStarRating ?? 0) / 5) * 100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Pending Reviews</span>
                        <span className="font-medium">
                          {dashboardData?.data?.review?.totalPendingReviews ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.review?.totalReviews ?? 0) > 0
                            ? ((dashboardData?.data?.review?.totalPendingReviews ?? 0) /
                              (dashboardData?.data?.review?.totalReviews ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}


              {/* Queries Card */}
              {dashboardData?.data?.query && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Queries</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.data?.query?.totalQueries ?? 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Total queries received</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>New</span>
                        <span className="font-medium">
                          {dashboardData?.data?.query?.totalNew ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.query?.totalQueries ?? 0) > 0
                            ? ((dashboardData?.data?.query?.totalNew ?? 0) /
                              (dashboardData?.data?.query?.totalQueries ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Pending</span>
                        <span className="font-medium">
                          {dashboardData?.data?.query?.totalPending ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.query?.totalQueries ?? 0) > 0
                            ? ((dashboardData?.data?.query?.totalPending ?? 0) /
                              (dashboardData?.data?.query?.totalQueries ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Avg. Response Time</span>
                        <span className="flex items-center font-medium">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatResponseTime(dashboardData?.data?.query?.avgResponseTime ?? 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}


              {/* Hiring Card */}
              {dashboardData?.data?.hiringStats && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Hiring</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.data?.hiringStats?.totalHiringPosts ?? 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Total hiring posts</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Open Positions</span>
                        <span className="font-medium">
                          {dashboardData?.data?.hiringStats?.openPositions ?? 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.hiringStats?.totalHiringPosts ?? 0) > 0
                            ? ((dashboardData?.data?.hiringStats?.openPositions ?? 0) /
                              (dashboardData?.data?.hiringStats?.totalHiringPosts ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Filled Positions</span>
                        <span className="font-medium">
                          {(dashboardData?.data?.hiringStats?.totalHiringPosts ?? 0) -
                            (dashboardData?.data?.hiringStats?.openPositions ?? 0)}
                        </span>
                      </div>
                      <Progress
                        value={
                          (dashboardData?.data?.hiringStats?.totalHiringPosts ?? 0) > 0
                            ? (((dashboardData?.data?.hiringStats?.totalHiringPosts ?? 0) - (dashboardData?.data?.hiringStats?.openPositions ?? 0)) /
                              (dashboardData?.data?.hiringStats?.totalHiringPosts ?? 1)) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}


              {/* Blogs Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Blogs</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.data?.blog.totalBlogs}</div>
                  <p className="text-xs text-muted-foreground">Total blog posts</p>
                  <div className="mt-4">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Recent Activity</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="ml-2 text-xs">Active</span>
                        </div>
                        <Link href={`/dashboard/blogs`} className="flex h-8 w-24 items-center justify-center rounded-md bg-muted-foreground/10 text-xs font-medium">
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Section */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Overall Statistics</CardTitle>
                <CardDescription>Summary of all key metrics across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Applications</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{dashboardData?.data?.jobApplication?.totalApplications}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Users</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{dashboardData?.data?.user.totalUsers}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium">Reviews</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{dashboardData?.data?.review.totalReviews}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium">Queries</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{dashboardData?.data?.query.totalQueries}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Hiring</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{dashboardData?.data?.hiringStats?.totalHiringPosts}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium">Blogs</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">{dashboardData?.data?.blog?.totalBlogs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Chart */}
            {/* <Activity /> */}
          </div>
        </main>
      </div>
    </div>

  )
}



