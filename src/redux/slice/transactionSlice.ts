import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionBody } from "../types/transactions";

interface ITransactionState {
  isLoading: boolean;
  transaction: ITransactionBody[];
}

const initialState: ITransactionState = {
  isLoading: false,
  transaction: [],
};

const transactionSlice = createSlice({
  name: "transaction", 
  initialState,
  reducers: {
    setTransaction(state, action: PayloadAction<ITransactionBody[]>) {
      state.transaction = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetTransactions(state) {
      state.transaction = [];
    },
  },
});

export const transactionActions = {...transactionSlice.actions,};

export type transactionState = ReturnType<typeof transactionSlice.reducer>;
export const transactionReducer  = transactionSlice.reducer;
