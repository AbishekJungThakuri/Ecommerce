import { createSlice } from '@reduxjs/toolkit';
import { dropIV } from '../assets/Data';

const initialState = {
  searchTerm: '',
  filteredResults: [],
};

const SearchSlice = createSlice({
  name: 'searchslice',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      const searchterm = action.payload;
      state.searchTerm = searchterm;
      // filtering based on input value
      if (searchterm) {
        state.filteredResults = dropIV.filter((item) =>
          item.name.toLowerCase().includes(searchterm.toLowerCase())
        );
      } else {
        state.filteredResults = []; // clearing the results if searchterm is empty
      }
    },

    clearSearch: (state, acton) => {
      state.searchTerm = '';
      state.filteredResults = [];
    },
  },
});

export const { setSearchTerm, clearSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
