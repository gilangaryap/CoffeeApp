import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPagination } from "../types/pagination";
import { ITestimonialBody } from "../types/testimonial";
import axios, { AxiosResponse } from "axios";
import { ITestimonialResponse } from "../types/response";

export const testimonialThunk = createAsyncThunk<
  { user: ITestimonialBody[]; pagination: IPagination },
  { currentPage: number; productsPage: number },
  { rejectValue: { error: Error; status?: number } } 
>(
  "product/fetch",
  async ({ currentPage, productsPage }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/product`;
      const result: AxiosResponse<ITestimonialResponse> = await axios.get(url, {
        params: { page: currentPage, limit: productsPage },
      });
      return {
        user: result.data.data, 
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