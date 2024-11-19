import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Services/operations/authApis';
import { useNavigate } from 'react-router-dom';
import ClickOutSide from '../Hooks/ClickOutSide';
import { deleteAccount } from '../../Services/operations/UpdateProfileApis';


const Modal = ({setShowModal, showModal, showDeleteModal, setShowDeleteModal}) => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);

    const ref = useRef();
    ClickOutSide(ref, () => showModal ? setShowModal(false) : setShowDeleteModal(false));


    const handleDeleteAccount = () => {
      setShowDeleteModal(false);
      dispatch(deleteAccount(token, navigate));
    }
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-richblack-600 transition-all duration-300 bg-opacity-50 z-50">
       <div ref={ref} className="w-[300px] p-6 bg-richblack-800 rounded-lg">
          <h1 className="text-xl font-semibold text-white mb-4">Are You Sure ?</h1>
          <p className="text-gray-400 mb-6">
            {
              showModal ? "You will be logged out of your Account!" : "You account will be permanently deleted"
            }
          </p>
          <div className="flex justify-end gap-5">
            <button className={`${showModal ? "bg-yellow-100" : "bg-red-200"} px-4 py-2 font-semibold active:scale-100 hover:scale-95 rounded text-black hover:bg-yellow-200`}
            onClick={() => showModal ? dispatch(logout(navigate)) : handleDeleteAccount()}>
               {
                showModal ? "Logout" : "Delete"
               }
            </button>
            <button className="bg-richblack-700 px-4 py-2 rounded hover:scale-95 active:scale-100 font-semibold text-white hover:bg-richblack-600"
            onClick={() => showModal ? setShowModal(false) : setShowDeleteModal(false)}>
               Cancel
            </button>
          </div>
       </div>
    </div>
  )
}

export default Modal
