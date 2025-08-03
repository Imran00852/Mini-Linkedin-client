import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.openModal = !state.openModal;
    },
  },
});

export default miscSlice;

export const { toggleModal } = miscSlice.actions;
