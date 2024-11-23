import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useSelector((state) => state.Profile);
  const navigate = useNavigate();

  return (
    <div className="text-white flex flex-col min-h-[50rem] gap-10 mx-auto w-[900px] max-w-5xl mt-10">
      <h1 className="text-3xl font-semibold ">My Profile</h1>

      {/* section 1 */}
      <div className="flex items-center justify-between w-full bg-richblack-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <img src={user?.UserImageUrl} className="aspect-square w-[78px] rounded-full object-cover border-2 border-richblack-700" />
          <div>
            <p className="text-lg font-semibold">{user?.FirstName + " " + user?.LastName}</p>
            <p className="text-sm text-richblack-300">{user?.Email}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-yellow-100 hover:text-yellow-200"
          onClick={() => { navigate("/dashboard/settings") }}>
          Edit <FaEdit />
        </button>
      </div>

      {/*section2 */}

      <div className="w-full bg-richblack-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold">About</p>
          <button className="flex items-center gap-2 text-sm font-medium text-yellow-100 hover:text-yellow-200"
            onClick={() => { navigate("/dashboard/settings") }}>
            Edit <FaEdit />
          </button>
        </div>
        <p className="text-sm text-richblack-300">{user?.AdditionalDetails?.About ? user.AdditionalDetails.About : "Write Something About Yourself"}</p>
      </div>

      {/* section 3 */}

      <div className="w-full bg-richblack-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold">Personal Details</p>
          <button className="flex items-center gap-2 text-sm font-medium text-yellow-100 hover:text-yellow-200"
            onClick={() => { navigate("/dashboard/settings") }}>
            Edit <FaEdit />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <p className="text-sm text-richblack-300">First Name</p>
          <p className="text-sm font-medium">{user?.FirstName}</p>
          </div>

          <div>
          <p className="text-sm text-richblack-300">Email</p>
          <p className="text-sm font-medium">{user?.Email}</p>
          </div>

          <div>
          <p className="text-sm text-richblack-300">Gender</p>
          <p className="text-sm font-medium">{user?.AdditionalDetails?.Gender ? user.AdditionalDetails.Gender : "Add Your Gender"}</p>
          </div>

          <div>
          <p className="text-sm text-richblack-300">Last Name</p>
          <p className="text-sm font-medium">{user?.LastName}</p>
          </div>

          <div>
          <p className="text-sm text-richblack-300">Mobile No</p>
          <p className="text-sm font-medium">{user?.MobileNo}</p>
          </div>

          <div>
          <p className="text-sm text-richblack-300">Date Of Birth</p>
          <p className="text-sm font-medium">{user?.AdditionalDetails?.DateOfBirth ? user.AdditionalDetails.DateOfBirth : "Add Your DOB"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
