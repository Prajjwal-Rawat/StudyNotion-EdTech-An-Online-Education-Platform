import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";


const initialState = {
    signupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    errMessage: ""
};


const authSlice = createSlice({
    name : 'auth',
    initialState: initialState,
    reducers: {
        setToken(state, value){
            state.token = value.payload;
        },
        setSignupData(state, value){
            state.signupData = value.payload;
        },
        setErrMessage(state, value){
            state.errMessage = value.payload;
        }
    }
});

export const {setToken, setSignupData, setErrMessage} = authSlice.actions;
export default authSlice.reducer;