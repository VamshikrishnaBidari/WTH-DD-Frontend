import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import themeReducer from "../features/themeSlice";
import scrollReducer from "../features/scrollSlice";
import courseReducer from "../features/courseSlice";
import schoolReducer from "../features/schoolSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"], // Persist user & token
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    theme: themeReducer,
    scroll: scrollReducer,
    school: schoolReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
