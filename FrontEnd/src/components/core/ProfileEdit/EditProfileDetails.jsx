import React from 'react'
import UpdateProfileImg from './UpdateProfileImg'
import EditDetails from "./EditDetails"
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const EditProfileDetails = () => {
  return (
    <div className='min-h-screen'>
       <UpdateProfileImg/>
       <EditDetails/>
       <ChangePassword/>
       <DeleteAccount/>
    </div>
  )
}

export default EditProfileDetails
