import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartItems from './RenderCartItems';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {totalItems} = useSelector((state) => state.Cart);

  return (
    <div>
        <h1 className="mb-14 text-3xl text-richblack-5 font-semibold">Your Cart</h1>  
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Course in Cart</p>

        {
            totalItems > 0 ? (
                <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                    <RenderCartItems/>
                    <RenderTotalAmount/>
                </div>
            ): (
                <div className="mt-14 text-center text-3xl text-richblack-100">
                    Your cart is Empty
                </div>
            )
        }
    </div>
  )
}

export default Cart
