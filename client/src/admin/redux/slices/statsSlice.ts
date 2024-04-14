import http from "@/api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface StatsSliceState {
  userStats: {
    totalUsers: number,
    monthlyUsers: number,
    newUsers: number,
  }
}

const initialState: StatsSliceState = {
  userStats: {
    totalUsers: 0,
    monthlyUsers: 0,
    newUsers: 0,
  }
}

export const getUsersStats = createAsyncThunk (
  "stats/getUserStats",
  async () => {
    const response = await http.get('/users/stats');
    return response.data;
  }
)

const StatsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersStats.fulfilled, (state, action) => {
        state.userStats = action.payload;
      })
  }
});

export default StatsSlice.reducer;