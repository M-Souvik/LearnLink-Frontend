'use client'

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

const LecturesPage = ({ params }) => {
  const { token } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/lectures/${params.id}`, {
          method: 'GET',
          headers: {
            'token': token
          }
        });
        const data = await response.json();
        console.log(data.lectures);
        setLectures(data.lectures);
        if (data.lectures.length > 0) {
          setSelectedLecture(data.lectures[0]);
        }
      } catch (error) {
        console.error('Failed to fetch lecture data:', error);
      }
    };

    fetchLectures();
  }, [params.id, token]);

  const handleLectureSelect = (lecture) => {
    setSelectedLecture(lecture);
  };

  return (
    <div className='flex min-h-screen'>
      <div className='w-80 bg-gray-900 p-4 border-r border-gray-700'>
        <h1 className='text-2xl flex gap-3 items-center mb-4'>
          <span>...</span> 
          <IoChevronForward /> 
          <Link href={'/my-courses'} className='font-bold hover:underline'>My Courses</Link> 
          <IoChevronForward />
        </h1>
        <h2 className='text-lg font-bold mb-2'>Modules</h2>
        <ul className='space-y-2'>
          {lectures.map((lecture, index) => (
            <li key={index}>
              <Button 
                className={`text-white w-full ${selectedLecture === lecture ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => handleLectureSelect(lecture)}
              >
                {lecture.title}
              </Button> 
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-grow flex-col justify-start m-4'>
        {selectedLecture && (
          <>
            <div className='mt-0 mb-4'>
              <video 
                controls 
                src={`http://localhost:5001/${selectedLecture.video}`} 
                className='w-full max-h-[40rem] object-contain'
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedLecture.title}</h2>
            <p className="text-xl text-left">{selectedLecture.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LecturesPage;