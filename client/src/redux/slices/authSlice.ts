import http from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string,
  isAuth: boolean,
  isLoading: boolean,
  error: unknown,
}

type registerForm = {
  name: string,
  username: string,
  email: string,
  password: string,
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || "",
  isAuth: localStorage.getItem('token') ? true : false,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string, password: string }) => {
    const response = await http.post("auth/login", data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response;
  }
);

export const userRegister = createAsyncThunk(
  "auth/resgister",
  async (data: registerForm) => {
    const response = await http.post("users/register", data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response;
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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.data.token;
        localStorage.setItem('token', state.token);
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
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;