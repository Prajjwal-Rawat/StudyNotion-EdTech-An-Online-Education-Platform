import React, { useState } from 'react'
import Chart from 'chart.js/auto';
import {Pie} from "react-chartjs-2"

// Chart.register(...registrables)

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    const getRandomColors = (numColors) => {
      const colors = [];
      for(let i = 0; i < numColors; i++){
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)})`

        colors.push(color);
      }
      return colors;
    }

    const studentChartData = {
        labels: courses.map((course) => course.CourseName),
        datasets: [
            {
                data: courses.map((course) => course.StudentEnrolled.length),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    const chartDataForIncome = {
        labels: courses.map((course) => course.CourseName),
        datasets: [
            {
                data: courses.map((course) => course.Price),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    const options = {

    }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-7">
      <p className="text-lg font-bold text-richblack-5">visualize</p>
      <div className="space-x-4 font-semibold">
        <button className={`rounded-sm p-1 px-3 transition-all duration-200 hover:text-yellow-50 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        onClick={() => setCurrChart("students")}>
            Students
        </button>
        <button className={`rounded-sm p-1 px-3 transition-all duration-200 hover:text-yellow-50 ${
            currChart === "Income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        onClick={() => setCurrChart("Income")}>
            Income
        </button>
      </div>

      <div className="relative mx-auto aspect-square h-full w-full">
        <Pie
        data={currChart === "students" ? studentChartData : chartDataForIncome}
        options={options}/>
      </div>
    </div>
  )
}

export default InstructorChart;