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
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
        <SideBar/>
        <div className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
