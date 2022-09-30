import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "application",
  initialState: {
    showRejectedApps: true,
    filters: {
      status: null,
      company: null,
      role: null,
    },
  },
  reducers: {
    applyFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state, action) => {
      state.filters = {
        status: null,
        company: null,
        role: null,
      };
    },
    toggleShowRejectedApps: (state, action) => {
      state.showRejectedApps = !state.showRejectedApps;
    },
  },
});

export const { applyFilters, clearFilters, toggleShowRejectedApps } =
  filterSlice.actions;
export default filterSlice.reducer;
