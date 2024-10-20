'use client'

import { useAuth } from '@/context/authContext';
import React, { useEffect, useState } from 'react';

const LecturesPage = ({ params }) => {
  const {token}=useAuth();
  const [Lectures, setLectures] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/lectures/${params.id}`,{
          method: 'GET',
          headers:{
            'token': token
          }
        });
        const data = await response.json();
        console.log(data.lectures)
        setLectures(data.lectures);
      } catch (error) {
        console.error('Failed to fetch lecture data:', error);
      }
    };

    fetchLectures();
  }, [params.id]);

  return (
    <div className='flex min-h-screen'>
      {/* <div className='flex-grow'>
        {Lectures ? (
          <video controls src={`http://localhost:5001/${Lectures.videoPath}`}>
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
      <div className='w-80 bg-gray-200 p-4'>
        <h2 className='text-lg font-bold'>Modules</h2>
        <ul>
          {Lectures?.map((module, index) => (
            <li key={index}>{module.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LecturesPage;