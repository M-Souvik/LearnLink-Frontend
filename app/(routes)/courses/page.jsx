'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from '@/components/modal';
// import { Modal } from "./modal"; // Assuming modal.jsx is in the same directory

// Extended sample course data
const courses = [
  {
    id: 1,
    name: "Introduction to React",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=400",
    modules: ["React Basics", "Components", "State and Props", "Hooks"],
    description: "Learn the fundamentals of React and start building modern web applications."
  },
  {
    id: 2,
    name: "Advanced JavaScript Techniques",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=400",
    modules: ["Closures", "Promises", "Async/Await", "Design Patterns"],
    description: "Take your JavaScript skills to the next level with advanced concepts and techniques."
  },
  {
    id: 3,
    name: "Web Design Fundamentals",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=400",
    modules: ["HTML5", "CSS3", "Responsive Design", "UI/UX Principles"],
    description: "Master the essentials of web design and create beautiful, responsive websites."
  },
  {
    id: 4,
    name: "Python for Beginners",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=400",
    modules: ["Python Basics", "Data Structures", "Functions", "File I/O"],
    description: "Start your programming journey with Python, one of the most popular languages."
  },
  {
    id: 5,
    name: "Data Science Essentials",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=400",
    modules: ["Statistics", "Data Visualization", "Machine Learning Basics", "Python for Data Science"],
    description: "Dive into the world of data science and learn how to extract insights from data."
  },
  {
    id: 6,
    name: "Mobile App Development with React Native",
    price: 69.99,
    image: "/placeholder.svg?height=200&width=400",
    modules: ["React Native Basics", "Navigation", "State Management", "Native Modules"],
    description: "Build cross-platform mobile apps using your React skills with React Native."
  },
];

export default function CoursesPage() {
  const handleAddCourse = (courseId) => {
    // Implement your add to cart logic here
    console.log(`Added course with ID ${courseId} to cart`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-bold mb-4">${course.price.toFixed(2)}</p>
              <Modal
                trigger={<Button variant="outline" className="w-full mb-2">View Details</Button>}
                title={course.name}
                description={course.description}
                content={
                  <div className="grid gap-4 py-4">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-auto rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold mb-2">Modules:</h4>
                      <ul className="list-disc pl-4 text-sm">
                        {course.modules.map((module, index) => (
                          <li key={index}>{module}</li>
                        ))}
                      </ul>
                    </div>
                    <Button onClick={() => handleAddCourse(course.id)} className="mt-4">
                      Add to Cart
                    </Button>
                  </div>
                }
              />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleAddCourse(course.id)}
              >
                Add Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}