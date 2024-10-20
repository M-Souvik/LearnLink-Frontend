"use client"
import React, { useEffect, useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, GraduationCap, Mail, MapPin, Phone, Code, Calendar, User2, UserCircle2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { TbMoodEmpty } from "react-icons/tb";

export default function StudentProfilePage() {
    const router = useRouter();
    const { authUser,token } = useAuth();
    const [studentInfo, setStudentInfo] = useState({
      name: "",
      email: "",
      phone: "",
      location: "",
      major: "",
      expectedGraduation: ""
    });

    const [subscribedCourses, setSubscribedCourses] = useState([]);

    useEffect(() => {
      const fetchStudentInfo = async () => {
        try {
          console.log(authUser)
          const response = await fetch(`http://localhost:5001/api/user/${authUser._id}`, {
            method: 'GET',
            headers: {
              'token': token
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("profile:",data.user)
          setStudentInfo(data.user);
          console.log("subscribed courses",data.user.subscription)
          setSubscribedCourses(data.user.subscription);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error.message);
        }
      };

      fetchStudentInfo();
    }, [token]);

    return (
      <div className="container mx-auto p-4 space-y-6 min-h-screen">
        <Card>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32 flex justify-center items-center bg-gray-900">
                <UserCircle2 size={150}/>
                {/* <span>{studentInfo.username}</span> */}
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold uppercase">{studentInfo.username}</h1>
                <p className="text-xl text-muted-foreground">{studentInfo.role === 'user' ? 'Student':'Admin'}</p>
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
                  {/* <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Expected Graduation: {studentInfo.expectedGraduation}
                  </p> */}
                </div>
              </div>
              <div className="flex-grow" />
              <Button onClick={() => router.push(`profile/edit-profile/${authUser._id}`)}>Edit Profile</Button>
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-2xl font-bold p-6">Subscribed Courses</h2>
          </div>
          <hr/>
          <div className="p-6 space-y-4 h-80">
            
            {subscribedCourses.length > 0 ? subscribedCourses.map((course) => (
              <div key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-semibold">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.id}</p>
                </div>
                {/* <div className="flex items-center mt-2 sm:mt-0">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{course.schedule}</span>
                </div> */}
              </div>
            )) : <div className='flex justify-center items-center h-[23rem] text-xl text-gray-700 fle flex-col'>
              <TbMoodEmpty size={60}/>
              <div>
              No courses yet...
              </div>
              </div>}
          </div>
        </Card>
      </div>
    );
}