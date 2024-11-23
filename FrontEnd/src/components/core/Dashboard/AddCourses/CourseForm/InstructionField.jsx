import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const InstructionField = ({name, label, register, setValue, errors, getValues }) => {

    const [requirements, setRequirements] = useState("");
    const [requirementList, setRequirementsList] = useState([]);

    const {editCourse, course} = useSelector((state) => state.course);

    const handleAddRequirements = () => {
       if(requirements){
        setRequirementsList([...requirementList, requirements]);
        setRequirements("");
       }
    }

    const handleRemoveRequirements = (index) => {
       const updatedRequirementList = [...requirementList];
       updatedRequirementList.splice(index, 1);
       setRequirementsList(updatedRequirementList);
    }

    useEffect(() => {
        if(editCourse){
            setRequirementsList(course?.instructions)
        }
        
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[]);

    useEffect(() => {
        setValue(name, requirementList)

    }, [requirementList])

  return (
    <div className='text-white'>
       <label htmlFor="instructions" className='relative w-full text-[0.875rem] text-slate-100'>{label} <sup className='text-red-200'>*</sup>
        <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
        type="text" 
        name= {name}
        placeholder='Enter Requirements' 
        id= "instructions"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        />

        <button className='text-yellow-50 font-semibold'
        onClick={handleAddRequirements} 
        type="button">
            Add
        </button>

       </label>

       <div>
          {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((require, index) => (
                            <li key={index} className='flex text-richblack-50 gap-x-2  capitalize items-center'>
                            <span>{require}</span>
                            <button className='text-sm text-richblack-200' 
                            onClick={() => handleRemoveRequirements(index)}>
                                clear
                            </button>
                            </li>
                        ))
                    }
                </ul>
            )
          }

          {
            errors[name] && (
                <span className='text-red-200'>
                    {label} is required
                </span>
            )
          }
       </div>
    </div>
  )
}

export default InstructionField