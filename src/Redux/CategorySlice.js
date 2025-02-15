import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'All'
};

export const CategorySlice = createSlice({
    name:'Category',
    initialState,
    reducers : {
         setCategory : (state, action)=>{
              state.category = action.payload
         }
    }
})

export const { setCategory } = CategorySlice.actions;
export default CategorySlice.reducer;