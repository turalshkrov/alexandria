/* eslint-disable no-unsafe-optional-chaining */
import http from "@/api/api";
import { BlogData, BlogType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BlogsSliceState {
  blogs: BlogType[] | null,
  selected: BlogType | null,
  isLoading: boolean,
  error: unknown,
}

const initialState: BlogsSliceState = {
  blogs: null,
  selected: null,
  isLoading: false,
  error: null,
}

export const getBlogs = createAsyncThunk(
  'blogs/get',
  async () => {
    const response = await http.get('/blogs/');
    return response.data;
  }
);

export const createBLog = createAsyncThunk(
  'blogs/create',
  async (data: BlogData) => {
    const response = await http.post('/blogs/create', data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({id, data}: { id: string, data: BlogData }) => {
    const response = await http.patch(`/blogs/${id}`, data)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id: string) => {
    const response = await http.delete(`/blogs/${id}`)
    .then(response => response)
    .catch(error => {
      throw new Error(error.response.data.message);
    })
    return response.data;
  }
)

const booksSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(createBLog.fulfilled, (state, action) => {
        state.blogs?.push(action.payload.blog);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        if (state.blogs) {
          state.blogs = [ ...state.blogs?.filter(blog => blog._id !== action.payload.blog._id), action.payload.blog ];
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        if (state.blogs) {
          state.blogs = [ ...state.blogs?.filter(blog => blog._id !== action.payload.blog._id) ];
        }
      })
  }
});

export default booksSlice.reducer;
export const { setSelectedBlog } = booksSlice.actions;