'use client'

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { BsFilterCircle } from "react-icons/bs";
import Dropdown from '@/components/dropdown';
import { MdTimelapse } from "react-icons/md";
import { MdStars } from "react-icons/md";
import { MdVideoCameraFront } from "react-icons/md";
import Script from 'next/script';
import { useAuth } from '@/context/authContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function CoursesPage() {
  const router=useRouter();
  const {token,authUser}=useAuth();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added state for loading

  const handleAddCourse = async (course) => {
    try {
      // Start by creating an order in the backend
      const response = await fetch(`${process.env.NEXT_API_URL}/api/course/checkout/${course._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token, // Send the token in the Authorization header
        },
        body: JSON.stringify({ amount: course.price * 100, currency: 'INR' }) // Price multiplied by 100 for paise
      });
  
      const order = await response.json();
      
      if (response.ok) {
        // Set up Razorpay options
        const options = {
          key: 'rzp_test_Fzm5ISnr4kvP9A', // Replace with your Razorpay key
          amount: order.order.amount, // Amount in subunits (paise)
          currency: 'INR',
          name: 'LearnLink',
          description: 'Connect and learn with everyone',
          order_id: order.order.id, // This is the order_id created by Razorpay in the backend
          handler: async function (response) {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
            try {
              // Call the payment verification API
              const verificationResponse = await fetch(`${process.env.NEXT_API_URL}/api/verfication/${course._id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'token': token,
                },
                body: JSON.stringify({
                  razorpay_order_id,
                  razorpay_payment_id,
                  razorpay_signature
                })
              });
  
              const verificationData = await verificationResponse.json();
  
              if (verificationResponse.ok) {
                toast.success(verificationData.message); // Show success message
                router.push('/payment-success'); // Navigate to the success page
              } else {
                toast.error(verificationData.message); // Show failure message
              }
  
            } catch (error) {
              toast.error(`Payment verification failed: ${error.message}`);
            }
          },
          theme: {
            color: "black"
          }
        };
  
        // Initialize Razorpay checkout
        const razorpay = new window.Razorpay(options);
        razorpay.open();
  
      } else {
        toast.error(order.message || 'Failed to create order');
      }
    } catch (error) {
      toast.error(`Checkout failed: ${error.message}`);
    }
  };
  

  const fetchCourses = async () => {
    setIsLoading(true); // Set loading state to true before fetching
    try {
      const response = await fetch(`${process.env.NEXT_API_URL}/api/course/?name=${searchTerm}&category=${selectedCategory}`);
      const data = await response.json();
      console.log(data)
      if (data && data.courses) {
        setFilteredCourses(data.courses); // Assuming the courses are nested under 'courses' in the response
      }
    } catch (error) {
      console.log('Error fetching courses', error.message);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <Script type='text/javascript' src='https://checkout.razorpay.com/v1/checkout.js'/>
      <h1 className="text-3xl font-bold mb-8">Explore Courses</h1>
      <div className="flex w-full max-w-sm justify-end items-center my-4 gap-4">
        <Input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      
      <Dropdown
        trigger={<button className="flex bg-transparent hover:border-2 hover:border-gray-600 hover:bg-gray-700 hover:text-white rounded-full text-gray-700" ><BsFilterCircle size={30}/></button>}
        content={
          <div className="flex flex-col gap-4 h-52 w-52">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Ui/Ux">UI/UX</option>
              
            </select>
          </div>
        }
      />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {isLoading ? (
          <div className='min-h-screen flex justify-center items-center animate-ping'>Loading...</div>
        ) : (
          filteredCourses && filteredCourses.map((course) => (
            <>
            <Card key={course._id} className={`flex flex-col h-72 shadow-md dark:shadow-gray-700 hover:scale-105 transition-all ease-in-out duration-500 `}>
              <CardContent className="relative flex-grow bg-transparent bg-gradient-to-b from-black to-gray-600 rounded-md w-full">
              <div>
                <Image
                          src={`${process.env.NEXT_API_URL}/${course.image.replace('\\', '/')}`} // Correcting the image URL to start with a leading slash
                          alt={course.name}
   
                          className="absolute object-cover top-0 left-0 w-full h-full rounded-md -z-1 opacity-30"
                          width={1000}
                          height={1000}
                        />
                <div className='absolute w-72 flex justify-center flex-col bottom-0 z-100 p-1'>
                <div className="flex justify-between items-center uppercase text-md font-semibold"><span className='text-ellipsis'>{course.name}</span> <span className='rounded-full text-xs px-2 text-blue-200 bg-blue-600 text-nowrap'>{course.category}</span> </div>
                <div className="flex justify-between items-center">
                <span className='flex justify-start items-center text-green-400 font-bold gap-1'><MdTimelapse />{course.duration}min</span>
                <p className="font-semibold flex gap-1 text-green-400 items-center">{course.lectures.length}<MdVideoCameraFront size={20}/> Lectures</p> {/* Added lectures count */}
                </div>
                <div className="flex justify-between items-center text-lg bg-green-600 text-green-200 rounded-full w-full font-bold px-3 my-2">
                  ${course.price.toFixed(2)}
                  <div className='flex items-center gap-1'><MdStars /> 4</div>
                  

                </div>
                <Modal
                  trigger={<Button variant="outline" className=" w-full mb-2">View Details</Button>}
                  title={course.name}
                  description={course.description}
                  content={
                    <div className="grid gap-4 py-4">
                      <Image
                        src={`${process.env.NEXT_API_URL}/${course.image.replace('\\', '/')}`} // Correcting the image URL to start with a leading slash
                        alt={course.name}
                        className="w-full h-auto rounded-md"
                        height={1000}
                        width={1000}
                      />
                      <div className=''>
                        <span>Modules:</span>
                        {course.lectures.map((lecture, index) => (
                          <>
                          <ul className="timeline timeline-vertical">
                          <li className='timeline-start'>
                           <div className="timeline-middle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="timeline-end timeline-box">{lecture.title}</div>
                          <hr />
                        </li>
                          </ul>
                          {/* <div key={index} className="mt-2">
                            <span className="font-semibold">{index + 1}. </span>
                          </div> */}
                          </>
                        ))}
                      </div>
                      <Button onClick={() => handleAddCourse(course)} className="mt-4">
                        Buy Course
                      </Button>
                    </div>
                  }
                />
                </div>
                </div>
              </CardContent>
              {/* <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleAddCourse(course.id)}
                >
                  Buy Course
                </Button>
              </CardFooter> */}
            </Card>
            </>
          ))
        )}
      </div>
    </div>
  );
}