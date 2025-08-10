import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReviewerState {
  currentPage: number;
  pageSize: number;
  statusFilter: string;
  searchQuery: string;
  sortBy: string;
  selectedApplicationId: string | null;
  isReviewFormOpen: boolean;
}

const initialState: ReviewerState = {
  currentPage: 1,
  pageSize: 10,
  statusFilter: "",
  searchQuery: "",
  sortBy: "submission_date",
  selectedApplicationId: null,
  isReviewFormOpen: false,
};

const reviewerSlice = createSlice({
  name: "reviewer",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setSelectedApplicationId: (state, action: PayloadAction<string | null>) => {
      state.selectedApplicationId = action.payload;
    },
    setIsReviewFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isReviewFormOpen = action.payload;
    },
    resetFilters: (state) => {
      state.currentPage = 1;
      state.statusFilter = "";
      state.searchQuery = "";
    },
  },
});

export const {
  setCurrentPage,
  setPageSize,
  setStatusFilter,
  setSearchQuery,
  setSortBy,
  setSelectedApplicationId,
  setIsReviewFormOpen,
  resetFilters,
} = reviewerSlice.actions;

export default reviewerSlice.reducer;
