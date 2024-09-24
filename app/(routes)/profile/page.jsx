"use client"
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, GraduationCap, Mail, MapPin, Phone, Code, Calendar } from "lucide-react";
import { useRouter } from 'next/navigation';
export default function StudentProfilePage() {
    const router=useRouter()
  const studentInfo = {
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    phone: "(987) 654-3210",
    location: "Boston, MA",
    major: "Computer Science",
    expectedGraduation: "May 2024"
  };

  const subscribedCourses = [
    { id: "CS101", name: "Introduction to Programming", schedule: "Mon, Wed 10:00 AM - 11:30 AM" },
    { id: "CS201", name: "Data Structures", schedule: "Tue, Thu 2:00 PM - 3:30 PM" },
    { id: "MATH301", name: "Linear Algebra", schedule: "Mon, Wed, Fri 1:00 PM - 2:00 PM" },
    { id: "CS350", name: "Operating Systems", schedule: "Tue, Thu 10:00 AM - 11:30 AM" }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="w-32 h-32">
              <img src="/placeholder.svg?height=128&width=128" alt="Student profile picture" />
              <span>JS</span>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{studentInfo.name}</h1>
              <p className="text-xl text-muted-foreground">{studentInfo.major} Student</p>
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {studentInfo.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {studentInfo.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {studentInfo.location}
                </p>
                <p className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Expected Graduation: {studentInfo.expectedGraduation}
                </p>
              </div>
            </div>
            <div className="flex-grow" />
            <Button onClick={()=>{router.push('/edit-profile')}}>Edit Profile</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <h2 className="text-2xl font-bold p-6">Subscribed Courses</h2>
        </div>
        <div className="p-6 space-y-4">
          {subscribedCourses.map((course) => (
            <div key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <h3 className="font-semibold">{course.name}</h3>
                <p className="text-sm text-muted-foreground">{course.id}</p>
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{course.schedule}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}