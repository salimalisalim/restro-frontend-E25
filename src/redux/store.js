import {configureStore} from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import userAuth from "./userAuth";


const store = configureStore({
    reducer:{
        restaurants:restaurantSlice,
        user:userAuth,
    }
});

export default store;