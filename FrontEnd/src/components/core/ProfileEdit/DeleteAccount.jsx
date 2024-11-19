import React, { useState } from 'react'
import { MdAutoDelete } from "react-icons/md";
import Modal from "../../common/Modal";

const DeleteAccount = () => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="text-white flex flex-col ml-[10rem] mb-3 gap-10 mx-auto w-[900px] max-w-5xl mt-10">
       <h1 className="text-3xl font-semibold">Delete Account</h1>
      <div className="flex flex-col bg-pink-900 p-6 rounded-lg shadow-md gap-6">
       <div className='flex gap-6 px-4'>
        <div className='group'>
       <MdAutoDelete size={30}  className='relative bg-red-800 w-20 h-20 p-3 rounded-lg'/>
       <div className='absolute hidden group-hover:block bg-black text-white px-4 py-2 rounded-lg bottom-[13.7em] left-[29%]'>Are Your Sure 😭</div>
        </div>
       <div className='text-richblack-200'>
         <h1 className='text-2xl text-white mb-3 font-semibold'>Delete Account</h1>
         <p>Would you like to delete account?</p>
         <p>This account may contain Paid Courses. Deleting your account is</p>
         <p>permanent and will remove all the contain associated with it.</p>

         <button onClick={() => setShowDeleteModal(true)} className='bg-white p-3 mt-3 rounded-lg text-black font-semibold hover:bg-red-800 transition-all duration-300 hover:scale-105 active:scale-95 active:transition-none hover:text-white'>
            I want to delete my account
         </button>
       </div>
       </div>

       {
        showDeleteModal && <Modal showDeleteModal = {showDeleteModal} setShowDeleteModal = {setShowDeleteModal}/> 
       }
      </div>
    </div>
  )
}

export default DeleteAccount
