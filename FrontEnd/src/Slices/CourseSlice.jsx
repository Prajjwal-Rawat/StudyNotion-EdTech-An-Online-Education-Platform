import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    step: localStorage.getItem("step") ? JSON.parse(localStorage.getItem("step")) : 1,
    course: localStorage.getItem("course") ? JSON.parse(localStorage.getItem("course")) : null,
    editCourse: false,
    paymentLoading: false,
}


const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{
        setSteps: (state, action) => {
            state.step = action.payload
            localStorage.setItem("step", JSON.stringify(action.payload));
        },
        setCourse: (state, action) => {
            state.course = action.payload
            localStorage.setItem("course", JSON.stringify(action.payload));
        },
        setEditCourse: (state, action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false;

            localStorage.removeItem("step");
            localStorage.removeItem("course");
        }
    }
});

export const {setCourse, setEditCourse, setPaymentLoading, resetCourseState, setSteps} = courseSlice.actions
export default courseSlice.reducer;