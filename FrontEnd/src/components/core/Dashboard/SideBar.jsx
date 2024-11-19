import React, { useState } from 'react'
import { sidebarLinks } from '../../../assets/Data/SideBarLinks';
import { useSelector } from 'react-redux';
import RenderSiderBarLinks from './RenderSiderBarLinks';
import Modal from '../../common/Modal';
import { CiLogout } from "react-icons/ci";

const SideBar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.Profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);

    if(authLoading || profileLoading){
        return(
            <div className="flex items-center justify-center h-screen">
                <p className="text-white text-lg">Loading...</p>
            </div>
        )
    }
  return (
    <div>
      <div className="flex min-w-[240px] flex-col border-r-[1px] border-richblack-700 min-h-full bg-richblack-900 text-richblack-5">
        
        <div className="flex flex-col px-4 py-6 space-y-2">
            {
                sidebarLinks.map((link) => {
                    if(link.type && user?.AccountType !== link.type) return null;

                    return(
                        <RenderSiderBarLinks key={link.id} link = {link} IconName = {link.icon}/>
                    )
                })
            }
        </div>

        <hr className="w-10/12 mx-auto my-4 bg-richblack-700"/>

        <div className="flex flex-col px-4 space-y-3">
          <RenderSiderBarLinks link={{name:"Setting", path:"/dashboard/settings"}} IconName={"VscSettingsGear"}/>
          <button className="flex items-center gap-2 px-3 font-semibold py-2 text-sm text-richwhite bg-transparent border border-transparent rounded-lg hover:bg-richblack-700 hover:border-yellow-300"
          onClick={() => setShowModal(true)}>
           <CiLogout size={20} /> Logout
          </button>
        </div>

      </div>

          {
            showModal && <Modal setShowModal={setShowModal} showModal = {showModal}/>
          }
    </div>
  )
}

export default SideBar
