import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCloudUpload } from "react-icons/io";
import { UpdateProfilePicture } from '../../../Services/operations/UpdateProfileApis';

const UpdateProfileImg = () => {

  const { user } = useSelector((state) => state.Profile);
  const { token } = useSelector((state) => state.auth);

  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);
  const dispatch = useDispatch();
  const fileInput = useRef();

  const handleClick = () => {
    fileInput.current.click();
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImgFile(file);
      previewFile(file);
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }


  const handleFileUpload = () => {

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("profilePicture", imgFile);

      dispatch(UpdateProfilePicture(token, formData));
    } catch (err) {
      console.log("Error in update profile picture");
    } finally {
      setLoading(false);
    }
  }


  return (

    <div className="text-white flex flex-col ml-[10rem] mb-3 gap-10 mx-auto w-[900px] max-w-5xl mt-10">
      <h1 className="text-3xl font-semibold">Update Profile Picture</h1>

      <div className="flex items-center bg-richblack-800 p-6 rounded-lg shadow-md gap-6">
        <img className="aspect-square w-[120px] rounded-full object-cover border-2 border-richblack-700"
          src={previewSource || user?.UserImageUrl} />

        <div className='flex flex-col gap-4'>
          <p className="text-sm text-richblack-300">Change Profile Picture</p>

          <div className="flex gap-4">

            <button
              onClick={handleClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-100 bg-richblack-900 rounded-lg hover:bg-richblack-700"
            >
              Select
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInput}
                accept="image/png, image/gif, image/jpeg"
              />
            </button>

            <button
              onClick={handleFileUpload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-100 bg-richblack-900 rounded-lg hover:bg-richblack-700"
              disabled={loading || !imgFile}
            >
              {loading ? "Uploading..." : "Upload"}
              <IoMdCloudUpload />
            </button>
          </div>

        </div>

      </div>
    </div>

  )
}

export default UpdateProfileImg

