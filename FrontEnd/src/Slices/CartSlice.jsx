import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
}

const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers:{
        setTotalItems(state, value){
           state.totalItems = value.payload
        }
    }
});


export const {setTotalItems} = CartSlice.actions;
export default CartSlice.reducer;