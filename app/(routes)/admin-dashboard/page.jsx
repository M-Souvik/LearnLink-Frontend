"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useAuth } from '@/context/authContext'

// Sample data for user growth, which we'll dynamically update
const initialUserData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 280 },
  { name: 'May', users: 200 },
  { name: 'Jun', users: 600 },
  { name: 'Jul', users: 700 },
]

export default function AdminDashboard() {
  const { token } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLectures: "",
    totalCourses: 0
  })
  const [displayUsers, setDisplayUsers] = useState(0)
  const [displayCourses, setDisplayCourses] = useState(0)
  const [userData, setUserData] = useState(initialUserData)

  const fetchOverallData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/stats', {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      })
      const data = await response.json()
      setStats(data.stats || { totalUsers: 0, totalLectures: "", totalCourses: 0 })
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchOverallData()
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Countdown effect for Users and Courses
  useEffect(() => {
    if (stats.totalUsers > 0) {
      let userCount = 0
      const interval = setInterval(() => {
        userCount += Math.ceil(stats.totalUsers / 100) // Adjust speed here
        if (userCount >= stats.totalUsers) {
          userCount = stats.totalUsers
          clearInterval(interval)
        }
        setDisplayUsers(userCount)
      }, 10) // Update every 10ms for smooth effect
      return () => clearInterval(interval)
    }
  }, [stats.totalUsers])

  useEffect(() => {
    if (stats.totalCourses > 0) {
      let courseCount = 0
      const interval = setInterval(() => {
        courseCount += Math.ceil(stats.totalCourses / 100) // Adjust speed here
        if (courseCount >= stats.totalCourses) {
          courseCount = stats.totalCourses
          clearInterval(interval)
        }
        setDisplayCourses(courseCount)
      }, 10) // Update every 10ms for smooth effect
      return () => clearInterval(interval)
    }
  }, [stats.totalCourses])

  // Update the chart data when totalUsers changes
  useEffect(() => {
    if (stats.totalUsers > 0) {
      const updatedUserData = [...userData]
      updatedUserData[updatedUserData.length - 1].users = stats.totalUsers // Update the latest month with totalUsers
      setUserData(updatedUserData)
    }
  }, [stats.totalUsers])

  return (
    <div className="container mx-auto p-4 min-h-screen justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Course Count Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{displayCourses || "Loading..."}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        {/* Date and Time Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardContent className="p-0">
            <div
              className="h-[200px] bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaGooto1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80')",
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              <Clock className="h-8 w-8 mb-2" />
              <div className="text-3xl font-bold">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-lg">
                {currentTime.toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Count Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{displayUsers || "Loading..."}</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={userData} // Using updated userData linked to totalUsers
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button>Generate Report</Button>
      </div>
    </div>
  )
}
