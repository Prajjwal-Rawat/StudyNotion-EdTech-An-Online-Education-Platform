import React, { forwardRef } from 'react';


const Modal = forwardRef(({ modalData }, ref) => {
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-richblack-600 transition-all duration-300 bg-opacity-50 z-50">
       <div ref={ref} className="w-[300px] p-6 bg-richblack-800 rounded-lg">
          <h1 className="text-xl font-semibold text-white mb-4">{modalData.text1}</h1>
          <p className="text-gray-400 mb-6">
             {modalData.text2}
          </p>
          <div className="flex justify-end gap-5">
            <button className={`${modalData.btn1Text === "Logout" ? "bg-yellow-100" : "bg-red-200"} px-4 py-2 font-semibold active:scale-100 hover:scale-95 rounded text-black hover:bg-yellow-200`}
            onClick={modalData?.btn1Handler}>
               {
                 modalData.btn1Text
               }
            </button>
            <button className="bg-richblack-700 px-4 py-2 rounded hover:scale-95 active:scale-100 font-semibold text-white hover:bg-richblack-600"
            onClick={modalData?.btn2Handler}>
               {modalData.btn2Text}
            </button>
          </div>
       </div>
    </div>
  )
})

export default Modal
