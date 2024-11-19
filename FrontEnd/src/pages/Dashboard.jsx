import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/core/Dashboard/SideBar';

const Dashboard = () => {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.Profile);

    if(authLoading || profileLoading){
        return (
            <div className='m-auto mt-10'>
                Loading...
            </div>
        )
    }
  return (
    <div className='relative flex'>
        <SideBar/>
        <div>
            <div className='flex-grow mx-auto w-11/12 max-w-[1000px]'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
