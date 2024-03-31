import { createSelector } from "@reduxjs/toolkit";
import { RootStore } from "./store";

const modalSelector = (state: RootStore) => state.ModalSlice;

const isOpenSelector = createSelector(
  [modalSelector],
  (modal) => modal.isOpen,
);

export const modalIsOpenSelector = createSelector(
  [isOpenSelector, (_state, id) => id],
  (isOpen, id) => isOpen[id]
);