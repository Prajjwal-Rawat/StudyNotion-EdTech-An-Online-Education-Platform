import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartItems from './RenderCartItems';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {totalPrice, totalItems} = useSelector((state) => state.Cart);

  return (
    <div className='text-white'>
        <h1>Your Cart</h1>  
        <p>{totalItems} Course in Cart</p>

        {
            totalItems > 0 ? (
                <div>
                    <RenderCartItems/>
                    <RenderTotalAmount/>
                </div>
            ): (
                <div>
                    Your cart is Empty
                </div>
            )
        }
    </div>
  )
}

export default Cart
