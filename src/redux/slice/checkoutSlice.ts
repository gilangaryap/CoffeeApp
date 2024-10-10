import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionProduct } from "../types/product";

export interface IProductState {
  checkout: ITransactionProduct[];
}

const initialState: IProductState = {
  checkout: [],
};

const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState,
  reducers: {
    checkoutProduct: (state, action: PayloadAction<ITransactionProduct>) => {
      const newCheckout = [...state.checkout];
      const index = newCheckout.findIndex(
        (product) =>
          product.uuid === action.payload.uuid &&
          product.size_id === action.payload.size_id &&
          product.ice_hot === action.payload.ice_hot
      );
      if (index > -1) {
        const selectedCheckout = { ...newCheckout[index] };
        selectedCheckout.count += 1;
        newCheckout[index] = selectedCheckout;
        state.checkout = newCheckout;
      } else {
        newCheckout.push(action.payload);
        state.checkout = newCheckout;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const newCheckout = state.checkout.filter(
        (_, index) => index !== action.payload
      );
      state.checkout = newCheckout;
    },
  },
  extraReducers: () => {},
});

export const checkoutAction = {
  ...checkoutSlice.actions,
};
export type checkoutState = ReturnType<typeof checkoutSlice.reducer>;
export const checkoutReducer = checkoutSlice.reducer;
