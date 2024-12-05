import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},

]
const StatsComponent = () => {

  return (
    <section>
        <div className='bg-richblack-300 py-9 lg:px-[15rem] mt-16'>
            <div className='flex justify-between items-centers font-bold text-xl'>
                {
                    stats.map((data, index) => {
                        return(
                            <div key={index}>
                                <h1 className='text-center lg:text-2xl'>{data.count}</h1>
                                <h2 className='text-richblack-600 text-sm lg:text-lg'>{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
