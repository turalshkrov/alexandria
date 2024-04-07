import http from "@/api/api";
import { ListType } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserListsState {
  lists: ListType[] | null,
  isLoading: boolean,
  selectedList: string,
  selectedBook: string,
  error: unknown
}

const initialState: UserListsState = {
  lists: null,
  isLoading: false,
  selectedList: "",
  selectedBook: "",
  error: null
}

export const getMyLists = createAsyncThunk(
  'userList/getMyLists',
  async (userId: string) => {
    const response = await http.get(`users/${userId}/lists`);
    return response.data;
  }
);

export const createNewList = createAsyncThunk(
  'userList/create',
  async (title: string) => {
    const response = await http.post('lists/create', { title });
    return response.data;
  }
);

export const updateList = createAsyncThunk(
  'userList/updateList',
  async ({ id, title }: { id: string, title: string } ) => {
    const response = await http.patch(`lists/${id}`, { title });
    return response.data;
  }
);

export const deleteList = createAsyncThunk(
  'userLists/delete',
  async (id: string) => {
    const response = await http.delete(`/lists/${id}`);
    return response.data;
  }
);

export const addBook = createAsyncThunk(
  'userLists/addBook',
  async ({ listId, bookId }: { listId: string, bookId: string }) => {
    const response = await http.patch(`/lists/${listId}/add-book`, { bookId });
    return response.data;
  }
);

export const removeBook = createAsyncThunk(
  'userList',
  async ({ listId, bookId }: { listId: string, bookId: string }) => {
    const response = await http.patch(`/lists/${listId}/remove-book`, { bookId });
    return response.data;
  }
)

const userListsSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
      })
      .addCase(getMyLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewList.fulfilled, (state, action) => {
        const newList = action.payload.list;
        state.lists?.push(newList);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const updatedList: ListType = action.payload.list;
        state.lists?.forEach(list => {
          if (list._id === updatedList._id) list.title = updatedList.title;
        });
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const id: string = action.payload.id;
        if (state.lists) state.lists = state.lists.filter(list => list._id !== id);
      })
      .addCase(addBook.fulfilled, (state, action) => {
        const updatedList: ListType = action.payload.list;
        state.lists?.forEach(list => {
          if (list._id === updatedList._id) list.books = updatedList.books;
        });
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const updatedList: ListType = action.payload.list;
        state.lists?.forEach(list => {
          if (list._id === updatedList._id) list.books = updatedList.books;
        });
      })
  }
});

export default userListsSlice.reducer;
export const { setSelectedList, setSelectedBook } = userListsSlice.actions;