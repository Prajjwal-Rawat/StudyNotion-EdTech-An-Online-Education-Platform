import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {

  const {totalPrice} = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    console.log("Buy now is not available right now");
  }


  return (
    <div>
       <p>Total</p>
       <p>Rs {totalPrice}</p>

       <button onClick={handleBuyCourse}>
        Buy Now
       </button>
    </div>
  )
}

export default RenderTotalAmount
