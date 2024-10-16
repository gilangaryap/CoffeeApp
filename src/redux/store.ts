import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistStore } from "redux-persist";
import { filterReducer, productState } from "./slice/filterProductSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { selectProductReducer } from "./slice/selectProduct";
import { checkoutReducer } from "./slice/checkoutSlice";
import { productDetailReducer } from "./slice/productDetailSlice";
import { historyOrderReducer } from "./slice/historyOrderSlice";

const productPersistConfig: PersistConfig<productState> = {
  key: "product:coffee",
  storage,
  whitelist: [ "id" , "uuid" ],
};
const persistedProductReducer = persistReducer(productPersistConfig, filterReducer);
export const store = configureStore({
    reducer:{
      filterProduct: persistedProductReducer,
      selectProduct: selectProductReducer,
      checkout: checkoutReducer,
      detailProduct: productDetailReducer,
      historyOrder: historyOrderReducer,
    },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializeableCheck: false,
    immutableCheck: false
  })
})

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;