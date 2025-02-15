import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './CartSlice';
import categorySlice from './CategorySlice';


export const store = configureStore({
    reducer : {
       cart : cartSlice,
       category : categorySlice,
    }
})