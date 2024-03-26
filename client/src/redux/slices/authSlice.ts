import { Form } from "@/pages/signup";
import http from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: string,
  token: string,
  role: string,
  isAuth: boolean,
  isLoading: boolean,
  error: string | null,
}

const initialState: AuthState = {
  userId: localStorage.getItem('userId') || "",
  token: localStorage.getItem('token') || "",
  isAuth: localStorage.getItem('token') ? true : false,
  role: localStorage.getItem('role') || "",
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string, password: string }) => {
    const response = await http.post("auth/login", data);
    return response.data;
  }
);

export const userRegister = createAsyncThunk(
  "auth/resgister",
  async (data: Form) => {
    const response = await http.post("users/register", data);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      state.token = "";
      state.role = "";
      state.userId = "";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.isLoading = false;
        localStorage.setItem('token', state.token);
        localStorage.setItem('userId', state.userId);
        localStorage.setItem('role', state.role);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Somethings get wrong';
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;