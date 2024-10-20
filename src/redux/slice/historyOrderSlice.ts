import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterHistoryOrder, IHistoryOrderBody } from "../types/historyOrder";
import { IPagination } from "../types/pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IHistoryResponse } from "../types/response";

export interface IHistoryOrderState {
    isLoading: boolean;
    history: IHistoryOrderBody[];
    filter: IFilterHistoryOrder[];
    pagination: IPagination;
  }
  
  const initialState: IHistoryOrderState = {
    isLoading: false,
    history: [],
    filter: [],
    pagination: {
      prevLink: null,
      nextLink: null,
      currentPage: 1,
      totalPages: 1,
    },
  };
  
  const historyOrderThunk = createAsyncThunk<
    { history: IHistoryOrderBody[]; pagination: IPagination },
    { filters: IFilterHistoryOrder; currentPage: number; historyPerPage: number,uuid: string },
    { rejectValue: { error: Error; status?: number } }
  >(
    "historyOrder/fetchHistory",
    async ({ filters, currentPage, historyPerPage,uuid }, { rejectWithValue }) => {
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/transaction/history-order/${uuid}`;
        
        const result: AxiosResponse<IHistoryResponse> = await axios.get(url, {
          params: { ...filters, page: currentPage, limit: historyPerPage },
        });
        return {
          history: result.data.data,
          pagination: {
            totalData: result.data.meta?.totalData || 0,
            totalPages: result.data.meta?.totalPage || 1,
            prevLink: result.data.meta?.prevLink || null,
            nextLink: result.data.meta?.nextLink || null,
            currentPage,
          },
        };
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue({
            error: error.response?.data || new Error("An error occurred"),
            status: error.response?.status,
          });
        }
        return rejectWithValue({ error: new Error("An unknown error occurred") });
      }
    }
  );
  
  const historySlice = createSlice({
    name: "historyOrder",
    initialState,
    reducers: {
      setHistory: (state, action: PayloadAction<IHistoryOrderBody[]>) => {
        state.history = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(historyOrderThunk.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(historyOrderThunk.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(historyOrderThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.history = action.payload.history;
          state.pagination = action.payload.pagination;
        });
    },
  });
  
  export const historyOrderActions = {
    ...historySlice.actions,
    historyOrderThunk,
  };
  
  export type HistoryOrderState = ReturnType<typeof historySlice.reducer>;
  export const historyOrderReducer = historySlice.reducer;