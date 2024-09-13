import { createSlice } from "@reduxjs/toolkit";

const initialState: object[] = [];

const restClient = createSlice({
  name: "restClient",

  initialState,

  reducers: {
    addResponse: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export default restClient;
export const { addResponse } = restClient.actions;
