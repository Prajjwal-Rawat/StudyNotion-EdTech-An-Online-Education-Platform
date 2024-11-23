import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const TagsInput = ({name, label, register, errors, setValue }) => {

    const [tags, setTags] = useState("");
    const [tagsList, setTagsList] = useState([]);

    const {editCourse, course} = useSelector((state) => state.course);


    const handleAddtag = () => {
       if(tags.trim()){
        const updatedTags = [...tagsList, tags.trim()];
        setTagsList(updatedTags);
        setTags("");
       }
    }

    const handleRemoveTag = (index) => {
       const updatedTagList = [...tagsList];
       updatedTagList.splice(index, 1);
       setTagsList(updatedTagList);
    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " "){
            event.preventDefault();
            handleAddtag();
        }
    }

    useEffect(() => {
        if (editCourse) {
          setTagsList(course?.Tags)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
      }, [])
    
      useEffect(() => {
        setValue(name, tagsList)
      }, [tagsList])


  return (
    <div className='text-white'>
        <div>
            {
                tagsList.length > 0 && (
                    <div className='flex gap-x-2 flex-wrap'>
                        {
                            tagsList.map((tag, index) => (
                                <p key={index} className='bg-yellow-700 text-yellow-5 px-3 py-1 flex gap-x-2 rounded-full items-center'>
                                    {tag}

                                    <button onClick={() => handleRemoveTag(index)} className='text-richblack-800 font-semibold text-[17px]'>
                                        x
                                    </button> 
                                </p>
                            ))
                        }
                    </div>
                )
            }
        </div> 

        <div>
            <label htmlFor="tags" className='relative w-full text-[0.875rem] text-slate-100'> {label}
               <input className="bg-richblack-800 rounded-[0.5rem] mt-1 text-slate-400 w-full p-[14px] border-b-2 border-richblack-100"
               type="text" 
               name={name} 
               id="tags"
               placeholder='Enter Tags'
               value={tags}
               onChange={(e) => setTags(e.target.value)}
               onKeyDown={handleKeyDown}
               />

               {
                errors[name] && (
                    <span className='text-red-200'>Tags Are Required</span>
                )
               }
            </label>
        </div> 
    </div>
  )
}

export default TagsInput
