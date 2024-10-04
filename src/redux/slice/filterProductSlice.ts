import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters, IProductBody } from "../types/product";
import { IPagination } from "../types/pagination";
import axios, { AxiosResponse } from "axios";
import { IProductResponse } from "../types/response";

export interface IProductState {
  filter: IFilters;
  uuid: string;
  product: IProductBody[];
  orderTotal: number;
  pagination: IPagination;
  isLoading: boolean;
}

const initialState: IProductState = {
  filter: {
    category: "",
    sortBy: "",
    max_price: '',
    min_price: '',
    searchText: "",
  },
  uuid: "",
  product: [],
  orderTotal: 0,
  pagination: {
    prevLink: null,
    nextLink: null,
    currentPage: 1,
    totalPages: 1,
  },
  isLoading: false,
};

export const productThunk = createAsyncThunk<
  {products: IProductBody[];pagination: IPagination;}, 
  { filters: IFilters; currentPage: number; productsPage: number },
  { rejectValue: { error: Error; status?: number } }
>(
  "product/fetch",
  async ({ filters, currentPage, productsPage }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/product`;
      const result: AxiosResponse<IProductResponse> = await axios.get(url, {
        params: { ...filters, page: currentPage, limit: productsPage },
      });
      return {
        products: result.data.data,
        pagination: {
          totalData: result.data.meta?.totalData || 0,
          totalPages: result.data.meta?.totalPage || 1,
          prevLink: result.data.meta?.prevLink || null,
          nextLink: result.data.meta?.nextLink || null,
          currentPage,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          error: error.response?.data,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }
);

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<IFilters>) => {
      state.filter = payload;
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
    updateFilter: (state, { payload }: PayloadAction<Partial<IFilters>>) => {
      state.filter = { ...state.filter, ...payload };
    },
    setProducts: (state, { payload }: PayloadAction<IProductBody[]>) => {
      state.product = payload;
    },
    setOrderTotal: (state, { payload }: PayloadAction<number>) => {
      state.orderTotal = payload;
    },
    setPagination: (state, { payload }: PayloadAction<IPagination>) => {
      state.pagination = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(productThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uuid = action.meta.requestId;
        state.product = action.payload.products;
        state.pagination = action.payload.pagination;
      });
  },
});

export const filterActions ={ ...filterSlice.actions , productThunk};

export type productState = ReturnType<typeof filterSlice.reducer>;
export const filterReducer = filterSlice.reducer;
