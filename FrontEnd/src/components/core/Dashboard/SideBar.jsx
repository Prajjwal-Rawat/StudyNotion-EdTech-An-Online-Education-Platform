import React, { useRef, useState } from 'react'
import { sidebarLinks } from '../../../assets/Data/SideBarLinks';
import { useDispatch, useSelector } from 'react-redux';
import RenderSiderBarLinks from './RenderSiderBarLinks';
import Modal from '../../common/Modal';
import { CiLogout } from "react-icons/ci";
import { logout } from '../../../Services/operations/authApis';
import ClickOutSide from '../../Hooks/ClickOutSide';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.Profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(null);

    const modalRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    ClickOutSide(modalRef, () => setShowModal(null));

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
            onClick={() => setShowModal({
            text1: "Are you sure?",
            text2: "You will be logged out of your account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setShowModal(null),
          })}>
           <CiLogout size={20} /> Logout
          </button>
        </div>

      </div>

          {
            showModal && <Modal modalData = {showModal} ref={modalRef}/>
          }
    </div>
  )
}

export default SideBar
