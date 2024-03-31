import { createSlice } from "@reduxjs/toolkit"

interface ModalState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isOpen: any
}

const initialState: ModalState = {
  isOpen: {}
}

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen[action.payload.id] = action.payload.isOpen;
    }
  }
});

export default ModalSlice.reducer;
export const { setIsOpen } = ModalSlice.actions;