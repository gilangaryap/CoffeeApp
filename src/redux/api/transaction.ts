import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ITransactionBody } from "../types/transactions";
import { ITransactionResponse } from "../types/response";

export const transactionThunk = createAsyncThunk<
  { products: ITransactionBody[] },
  void,
  { rejectValue: { error: Error; status?: number } }
>("product/fetch", async (_, { rejectWithValue }) => {
  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/product/add`;
    const result: AxiosResponse<ITransactionResponse> = await axios.post(url);
    return {
      products: result.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        error: error.response?.data,
        status: error.response?.status,
      });
    }
    return rejectWithValue({
      error: new Error("An unexpected error occurred"),
    });
  }
});
