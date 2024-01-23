import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const restaurantSlice = createSlice({
    name:"restaurantSlice",
    initialState,
    reducers:{
        getRestaurants:(state,action)=>{
            state.data = action.payload;
        }
    }
});

export const {getRestaurants} = restaurantSlice.actions;

export default restaurantSlice.reducer;