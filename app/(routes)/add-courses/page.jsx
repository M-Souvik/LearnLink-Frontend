'use client'

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { BsFilterCircle } from "react-icons/bs";
import Dropdown from '@/components/dropdown';
import { MdTimelapse } from "react-icons/md";
import { FileVideo2, Star } from 'lucide-react';
import { MdStars } from "react-icons/md";
import { MdVideoCameraFront } from "react-icons/md";
import { Textarea } from '@/components/ui/textarea';
import { toast, Toaster } from 'sonner';
import { useAuth } from '@/context/authContext';
import { RiDeleteBinLine } from 'react-icons/ri'
import { PiVanLight } from 'react-icons/pi';
import { MdUpdate } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import Image from 'next/image';
export default function AddCoursesPage() {
  const {token,authUser}=useAuth();
  // console.log(aauthUser.role)
  console.log(token)
  
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added state for loading
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    createdBy: 'admin', // Check if authUser is defined before accessing its properties
    file: '',
    duration: '',
    price: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    category: '',
    createdBy: '',
    file: '',
    duration: '',
    price: ''
  });
  const [lectureFormData, setLectureFormData] = useState({
    title: '',
    description: '',
    duration: '',
    file: null
  });

  const handleLectureFormChange = (e) => {
    const { name, value } = e.target;
    setLectureFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLectureVideoChange = (e) => {
    setLectureFormData(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };
  const handleAddCourse = (courseId) => {
    // Implement your add to cart logic here
    console.log(`Added course with ID ${courseId} to cart`);
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

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Validate form input
    if (value.trim() === '') {
      setFormErrors(prevState => ({
        ...prevState,
        [name]: `${name} is required`
      }));
    } else {
      setFormErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      file: e.target.files[0] ? e.target.files[0] : ''
    }));
  
    // Validate file input only if a new file is uploaded
    if (!e.target.files[0] && !formData.file) {
      setFormErrors(prevState => ({
        ...prevState,
        file: 'File is required'
      }));
    } else {
      setFormErrors(prevState => ({
        ...prevState,
        file: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = Object.values(formErrors).every(error => error === '');
    if (!formIsValid) {
      console.error('Form is not valid');
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      console.log(formDataObj)
      const response = await fetch(`${process.env.NEXT_API_URL}/api/admin/course/create`, {
        method: 'POST',
        body: formDataObj,
        headers: {
          'token': token // Assuming authUser has a token property
        }
      });
      const data = await response.json();
      console.log(data);
      // Handle success

      toast.success('Course added successfully')
      await fetchCourses();
      // Reset form data after successful submission
      setFormData({
        name: '',
        description: '',
        category: '',
        createdBy: 'admin',
        file: '',
        duration: '',
        price: ''
      });
      setFormErrors({
        name: '',
        description: '',
        category: '',
        createdBy: '',
        file: '',
        duration: '',
        price: ''
      });
    } catch (error) {
      console.error('Error submitting form', error.message);
      toast.error('Failed to add Course');
    }
  };

  const handleEditForm = async (e, courseId) => {
    e.preventDefault();
    const formIsValid = Object.values(formErrors).every(error => error === '');
    if (!formIsValid) {
      console.error('Form is not valid');
      return;
    }
  
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Only append file if it's a new file, otherwise skip it
      if (key !== 'file' || formData.file !== '') {
        formDataObj.append(key, value);
      }
    });
  
    try {
      const response = await fetch(`${process.env.NEXT_API_URL}/api/admin/course/edit/${courseId}`, {
        method: 'PUT',
        body: formDataObj,
        headers: {
          'token': token
        }
      });
      const data = await response.json();
      console.log(data);
      
      setFormData({
        name: '',
        description: '',
        category: '',
        createdBy: 'admin',
        file: '',
        duration: '',
        price: ''
      });
      toast.success('Course updated successfully');
      await fetchCourses();
  
      // Reset form data after successful submission
      setFormData({
        name: '',
        description: '',
        category: '',
        createdBy: 'admin',
        file: '',
        duration: '',
        price: ''
      });
      setFormErrors({
        name: '',
        description: '',
        category: '',
        createdBy: '',
        file: '',
        duration: '',
        price: ''
      });
    } catch (error) {
      console.error('Error updating course', error.message);
      toast.error('Failed to update Course');
    }
  };
  const isFormValid = Object.values(formErrors).every(error => error === '') && Object.values(formData).every(value => value !== '');
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`${process.env.NEXT_API_URL}/api/admin/course/${courseId}`, {
        method: 'DELETE',
        headers: {
          'token': token
        }
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Course deleted successfully');
        await fetchCourses(); // Fetch the updated course list after deletion
      } else {
        toast.error(data.message || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error.message);
      toast.error('Failed to delete course');
    }
  };
  const handleAddLectures = async (e, courseId) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('title', lectureFormData.title);
    formDataObj.append('description', lectureFormData.description);
    formDataObj.append('duration', lectureFormData.duration);
    formDataObj.append('file', lectureFormData.file);

    try {
      const response = await fetch(`${process.env.NEXT_API_URL}/api/admin/course/${courseId}`, {
        method: 'POST',
        body: formDataObj,
        headers: {
          'token': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Lecture added successfully');
        // Reset lecture form data
        setLectureFormData({
          title: '',
          description: '',
          duration: '',
          file: null
        });
        await fetchCourses(); // Refresh the course list to show updated lecture count
      } else {
        throw new Error(data.message || 'Failed to add lecture');
      }
    } catch (error) {
      console.error('Error adding lecture:', error.message);
      toast.error('Failed to add lecture');
    }
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <div className="flex w-full justify-between items-center my-4 gap-4">
        <div className='flex gap-2 justify-start items-center'>
        <Input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80"
        />
        
      
      <Dropdown
        trigger={<button className="flex bg-transparent hover:border-2 hover:border-gray-600 hover:bg-gray-700 hover:text-white rounded-full text-gray-700" ><BsFilterCircle size={30}/></button>}
        content={
          <div className="flex flex-col gap-4 h-52 w-52">
            <Input 
              type="text" 
              placeholder="Category" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        }
      />
      </div>
      <div>
      <Modal
                  trigger={<Button variant="outline" className=" w-full bg-green-500">Add Courses</Button>}
                  title="Add Courses"
                  description={<></>}
                  content={
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                      <Input 
                        type="text" 
                        placeholder="Course Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.name}</div>
                      <Textarea
                        placeholder="Course Description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.description}</div>
                      <Input 
                        type="text" 
                        placeholder="Category" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleFormDataChange}
                        className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <div className="text-red-500">{formErrors.createdBy}</div>
                      <input 
                        type="file" 
                        name="file" 
                        onChange={handleFileChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.file}</div>
                      <Input 
                        type="text" 
                        placeholder="Duration" 
                        name="duration" 
                        value={formData.duration} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.duration}</div>
                      <Input 
                        type="text" 
                        placeholder="Price" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.price}</div>
                      <Button 
                        type="submit" 
                        className="mt-4"
                      >
                        Add Course
                      </Button>
                    </form>
                  }
                />
                </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className='min-h-screen flex justify-center items-center animate-ping pl-10 pt-10'>Loading...</div>
        ) : (
          filteredCourses && filteredCourses.map((course) => (
            <>
            <Card key={course._id} className={`flex flex-col h-72 shadow-sm hover:shadow-md dark:shadow-gray-700 hover:scale-105 transition-all ease-in-out duration-500 `}>
              <CardContent className="relative flex-grow bg-transparent bg-gradient-to-b from-black to-gray-600 rounded-md w-full">
              <div>
                <Image
                          src={`${process.env.NEXT_API_URL}/${course.image.replace('\\', '/')}`} // Correcting the file URL to start with a leading slash
                          alt={course.name}
   
                          className="absolute object-cover top-0 left-0 w-full h-full rounded-md -z-1 opacity-30 hover:opacity-15 transition-opacity duration-300"
                          width={1000}
                          height={1000}
                        />
              <div className="absolute flex flex-col z-100 translate-y-4 right-2">
                <Modal
                  trigger={<Button className=" mb-1 p-0 bg-transparent border-none hover:text-yellow-500 rounded-full hover:bg-transparent" onClick={() => setFormData(course)}><MdUpdate size={30} className='bg-yellow-700 rounded-full'/></Button>}
                  title="Update Course"
                  description={<></>}

                  content={
                    <form onSubmit={(e)=>handleEditForm(e, course._id)} className="grid gap-4 py-4">
                      <Input 
                        type="text" 
                        placeholder="Course Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.name}</div>
                      <Textarea
                        placeholder="Course Description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.description}</div>
                      <Input 
                        type="text" 
                        placeholder="Category" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleFormDataChange}
                        className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <div className="text-red-500">{formErrors.createdBy}</div>
                      <input 
                        type="file" 
                        name="file" 
                        onChange={handleFileChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.file}</div>
                      <Input 
                        type="text" 
                        placeholder="Duration" 
                        name="duration" 
                        value={formData.duration} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.duration}</div>
                      <Input 
                        type="text" 
                        placeholder="Price" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleFormDataChange}
                        className="w-full"
                      />
                      <div className="text-red-500">{formErrors.price}</div>
                      <Button 
                        type="submit" 
                        className="mt-4"
                      >
                        Update Course
                      </Button>
                    </form>
                  }
                />
                {/* delete */}
                <Modal
                      trigger={<Button variant="outline" className="w-fit rounded-full mb-2 bg-transparent border-none hover:bg-transparent  hover:text-red-300"><MdAutoDelete size={30} className='bg-red-700 rounded-full p-1'/></Button>}
                      title="Remove Course"
                      description="Do you really want to delete this course? This action is irreversible."
                      content={
                        <div className="flex justify-end space-x-2">
                          <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400">
                            Cancel
                          </Button>
                          <Button 
                            className="bg-red-500 text-white hover:bg-red-600"
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            <RiDeleteBinLine size={20} />Remove
                          </Button>
                        </div>
                      }
                    />
                </div>
                <div className='absolute w-72 flex justify-center flex-col top-32 z-100 p-1 bottom-1'>
                <div className="flex justify-between items-center uppercase text-md font-semibold"><span className=''>{course.name}</span> <span className='rounded-full text-xs px-2 text-blue-200 bg-blue-600 text-nowrap'>{course.category}</span> </div>
                <div className="flex justify-between items-center">
                <span className='flex justify-start items-center text-green-400 font-bold gap-1'><MdTimelapse />{course.duration}min</span>
                <p className="font-semibold flex gap-1 text-green-400 items-center">{course.lectures.length}<MdVideoCameraFront size={20}/> Lectures</p> {/* Added lectures count */}
                </div>
                <div className="flex justify-between items-center text-lg bg-gray-400 text-gray-700 rounded-full w-full font-bold px-3 my-2">
                ₹{course.price.toFixed(2)}
                  <div className='flex items-center gap-1'><MdStars className=' text-yellow-500'/> 4</div>
                  

                </div>
                {/* //add lectures */}
                <Modal
                  trigger={<Button onClick={() => setLectureFormData({ title: '', description: '', duration: '', file: null })} className="bg-green-700 border hover:bg-green-600"><FileVideo2 size={20} /> Add Lectures</Button>}
                  title="Add Lectures"
                  description={<></>}
                  content={
                    <form onSubmit={(e) => handleAddLectures(e, course._id)} className="grid gap-4 py-4">
                      <Input 
                        type="text" 
                        placeholder="Lecture Title" 
                        name="title" 
                        value={lectureFormData.title} 
                        onChange={handleLectureFormChange}
                        className="w-full"
                        required
                      />
                      <Textarea
                        placeholder="Lecture Description" 
                        name="description" 
                        value={lectureFormData.description} 
                        onChange={handleLectureFormChange}
                        className="w-full"
                        required
                      />
                      <Input 
                        type="text" 
                        placeholder="Duration (in minutes)" 
                        name="duration" 
                        value={lectureFormData.duration} 
                        onChange={handleLectureFormChange}
                        className="w-full"
                        required
                      />
                      <input 
                        type="file" 
                        name="file" 
                        onChange={handleLectureVideoChange}
                        className="w-full"
                        required
                      />
                      <Button 
                        type="submit" 
                        className="mt-4"
                      >
                        Add Lecture
                      </Button>
                    </form>
                  }
                />
                </div>
                </div>
               
              </CardContent>
            </Card>
                {/* Update Modal */}
            </>
          ))
        )}
      </div>
      <Toaster richColors position='bottom-right'/>
    </div>
  );
}