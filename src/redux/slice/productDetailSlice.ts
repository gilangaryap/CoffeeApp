import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetailProduct } from "../types/product";
import { IProductDetailResponse } from "../types/response";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface IProductState {
  isLoading: boolean;
  productDetail: IDetailProduct;
}

const initialState: IProductState = {
  isLoading: false,
  productDetail: {
    imgProduct: {
      img_1: "",
      img_2: "",
      img_3: "",
    },
    product: {
      uuid: "",
      count: 0,
      product_name: "",
      product_price: 0,
      discount_price: 0,
      product_description: "",
      rating:''
    },
  },
};

const productDetailThunk = createAsyncThunk<
  IDetailProduct,
  { uuid: string},
  { rejectValue: { error: Error; status?: number } }
>(
  "productThunk",
  async (params: { uuid: string }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/product/detail/${params.uuid}`;
      const result: AxiosResponse<IProductDetailResponse> = await axios(url, {
        method: "GET",
      });
      return result.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue({
          error: error.response?.data,
          status: error.status,
        });
      throw error;
    }
  }
);

const productDetailSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<IDetailProduct>) => {
      state.productDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productDetailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productDetailThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(productDetailThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload;
      });
  },
});

export const productDetailAction = {
  ...productDetailSlice.actions,
  productDetailThunk,
};
export type productDetailState = ReturnType<typeof productDetailSlice.reducer>;
export const productDetailReducer = productDetailSlice.reducer;
