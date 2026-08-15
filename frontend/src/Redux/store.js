import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './CartSlice';
import categorySlice from './CategorySlice';
import searchSlice from './SearchSlice';


export const store = configureStore({
    reducer : {
       cart : cartSlice,
       category : categorySlice,
       search : searchSlice,
    }
})