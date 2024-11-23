import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalPrice : localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,
}

const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id);

            if(index >= 0){
                toast.error("Course is already in cart");
                return;
            }

            state.cart.push(course);
            state.totalItems++;
            state.totalPrice += course.Price

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

            toast.success("Course added successfully to cart");
        },

        removeFromCart: (state, action) => {
           const courseId = action.payload;
           const index = state.cart.findIndex((item) => item._id === courseId);


           if(index >= 0){
            state.totalItems--
            state.totalPrice -= state.cart[index].Price
            state.cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

            toast.success("Course removed from the cart");
           }
        },

        resetCart: (state) => {
            state.cart = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("totalPrice");
        }
    }
});


export const {addToCart, removeFromCart, resetCart} = CartSlice.actions;
export default CartSlice.reducer;