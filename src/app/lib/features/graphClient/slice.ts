import { createSlice } from "@reduxjs/toolkit";

type InitState = {
  schema: string;
};
const initialState: InitState = {
  schema: "",
};

const graphClient = createSlice({
  name: "graphClient",
  initialState,
  reducers: {
    getDocs: (state, action) => {
      state.schema = action.payload;
    },
  },
});

export const { getDocs } = graphClient.actions;
export default graphClient;
