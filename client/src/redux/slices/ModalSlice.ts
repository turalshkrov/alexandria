import { createSlice } from "@reduxjs/toolkit"

interface ModalState {
  showCreateList: boolean,
}

const initialState: ModalState = {
  showCreateList: false,
}

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleShowCreateList: (state) => {
      state.showCreateList = true;
    },
    handleCloseCreateList: (state) => {
      state.showCreateList = false;
    }
  }
});

export default ModalSlice.reducer;
export const { handleShowCreateList, handleCloseCreateList } = ModalSlice.actions;