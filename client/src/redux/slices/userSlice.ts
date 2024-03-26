import { Form } from "@/pages/signup";
import http from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string,
  name: string,
  username: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  active: boolean,
}

interface UserState {
  user: User | null,
  token: string,
  role: string | null
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token') || "",
  role: null
}

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string, password: string}) => {
    const response = await http.post("auth/login", data);
    return response.data;
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async () => {
    const response = await http.get("auth/user");
    return response.data;
  }
);

export const userRegister = createAsyncThunk(
  "user/resgister",
  async (data: Form) => {
    const response = await http.post("users/register", data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token');
      state.token = "";
      state.role = null;
      state.user = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', state.token);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;