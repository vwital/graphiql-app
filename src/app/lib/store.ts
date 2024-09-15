import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import restClient from "./features/restClient/slice";
import graphClient from "./features/graphClient/slice";

const store = (): EnhancedStore =>
  configureStore({
    reducer: {
      restClient: restClient.reducer,
      graphClient: graphClient.reducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export { store };
