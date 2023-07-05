import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { trelloApi } from "../api/trelloApi";
import { ICategory, ITask } from "@/model";

interface trelloSliceProps {
  categories: ICategory[] | [];
  totalPage: number;
}

const initialState: trelloSliceProps = {
  categories: [],
  totalPage: 2,
};

const trelloSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(trelloApi.endpoints.getCategoriesPagination.matchFulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addMatcher(trelloApi.endpoints.getCategoriesPagination.matchRejected, (state, { error }) => {
        console.error('Failed to fetch categories:', error);
      })
      .addMatcher(trelloApi.endpoints.getAllCategories.matchFulfilled, (state, { payload }) => {
        state.totalPage = Math.ceil(payload.length / 4);
      })
      .addMatcher(trelloApi.endpoints.getAllCategories.matchRejected, (state, { error }) => {
        console.error('Failed to fetch all categories:', error);
      });
  },
});

export const trelloActionss = trelloSlice.actions;
export const trelloReducer = trelloSlice.reducer;
