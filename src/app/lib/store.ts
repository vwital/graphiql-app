import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import restClient from "./restClient/slice";

const store = (): EnhancedStore =>
  configureStore({
    reducer: {
      restClient: restClient.reducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export { store };
