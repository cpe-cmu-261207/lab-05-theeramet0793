import { createContext, useEffect, useReducer } from "react";
import CourseCard from "./components/CourseCard";
import CourseForm from "./components/CourseForm";
import { useContext, useState } from "react";

export const sample = createContext()

function App() {
  const [myCourses, setMyCourse] = useState([]);
  const [GPA, setGPA] = useState(4.0);
  useEffect(() => {
    const temp = localStorage.getItem('f')
    if(temp!=null){
      setMyCourse(JSON.parse(temp))
      calculateGPA(JSON.parse(temp))
    }
  },[])
  useEffect(() => {
    localStorage.setItem('f',JSON.stringify(myCourses))
  },[myCourses]) 
  /**
   * Calculate the GPA of current courses
   * @returns the GPA of current courses
   */
  function calculateGPA(cc) {
    // TODO
    var Real_GPA = 0
    var Real_CRE  = 0 
    var cal_gpa = 0
    cc.forEach((item) => {
      switch(item.grd){
        case 'A' :
          Real_GPA = 4
          break
        case 'B+' :
          Real_GPA = 3.5
          break
        case 'B' :
          Real_GPA = 3
          break
        case 'C+' :
          Real_GPA = 2.5
          break
        case 'C' :
          Real_GPA = 2
          break
        case 'D+' :
          Real_GPA = 1.5
          break
        case 'D' :
          Real_GPA = 1
          break
        case 'F' :
          Real_GPA = 0
          break
      }  
      Real_CRE += Number(item.crd) 
      cal_gpa += Real_GPA * Number(item.crd)
    });
    setGPA(cal_gpa / Real_CRE) 
  }

  /**
   * Should be called when a course is to be added to the list.
   * After adding the course to the list, the displayed GPA should be updated.
   * @param {*} event 
   */
  function addCourse(inputData) {
    console.log(inputData)
    // TODO
    const course = [...myCourses,inputData]
    setMyCourse(course)
    // recalculate GPA
    calculateGPA(course);
  }

  /**
   * Should be called when a course is to be removed from the list.
   * After removing the course from the list, the displayed GPA should be updated.
   * @param {*} id 
   */
  function onDeleteCourse(id) {
    // TODO
    const course = myCourses.filter(item => {
      return item.name !== id
    })
    setMyCourse(course)
    calculateGPA(course)
  }

  return (
    <sample.Provider value = {addCourse}>
      <div className=" bg-yellow-100 container mx-auto h-screen">
      <h1 className="bg-red-500 text-center text-4xl p-3 tracking-widest">
        GPA CALCULATOR
      </h1>
      <div className="h-2/3 md:w-2/4 p-3 rounded-lg mx-auto overflow-auto">
        <h1 className="text-2xl my-3">My courses</h1>
        {/* TODO display courses */}
        {myCourses.map(item => {
          return <CourseCard name ={item.name} grd = {item.grd} crd ={item.crd} del={onDeleteCourse} />
        })}
      <CourseForm /> 
      </div>
      {/* TODO add course input form */}
      {/* TODO display calculated GPA */}
      <p className = "bg-red-100 rounded-3xl p-1 text-center hover:bg-red-200">GPA : {GPA}</p>
    </div>
  </sample.Provider>
  );
}

export default App;
