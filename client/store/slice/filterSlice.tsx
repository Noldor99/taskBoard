import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterSliceProps {
  currentPage: number
}

const initialState: filterSliceProps = {
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCurrentPageAction: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});


export const filterActions = filterSlice.actions;

export const filterReducer = filterSlice.reducer

