import React from 'react'
import '@/styles/dashboard.css'; // Import the CSS file

// Mock data for courses
const courses = [
  { id: 1, name: "Introduction to React", progress: 75, totalLessons: 20, completedLessons: 15 },
  { id: 2, name: "Advanced JavaScript", progress: 50, totalLessons: 30, completedLessons: 15 },
  { id: 3, name: "CSS Mastery", progress: 25, totalLessons: 25, completedLessons: 6 },
  { id: 4, name: "Node.js Fundamentals", progress: 10, totalLessons: 22, completedLessons: 2 },
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Courses</span>
            <i className="icon book"></i>
          </div>
          <div className="card-content">
            <div className="number">{courses.length}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Average Progress</span>
            <i className="icon chart"></i>
          </div>
          <div className="card-content">
            <div className="number">
              {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Lessons</span>
            <i className="icon users"></i>
          </div>
          <div className="card-content">
            <div className="number">
              {courses.reduce((acc, course) => acc + course.totalLessons, 0)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Completed Lessons</span>
            <i className="icon award"></i>
          </div>
          <div className="card-content">
            <div className="number">
              {courses.reduce((acc, course) => acc + course.completedLessons, 0)}
            </div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Your Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-header">
              <h3>{course.name}</h3>
              <p>{course.completedLessons} of {course.totalLessons} lessons completed</p>
            </div>
            <div className="course-content">
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                <span className="badge">{course.progress}%</span>
              </div>
              <button className="btn">Continue Learning</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
