import { createAsyncThunk } from "@reduxjs/toolkit";
import img from "../../assets/images/8d0f31b42b08e11e97f7bc8c06c07705.jpeg";
import { IDetailProduct } from "../types/product";
import { IProductDetailResponse } from "../types/response";
import axios, { AxiosError, AxiosResponse } from "axios";

export const productDummy = [
  {
    uuid: "1",
    img_product: img,
    product_name: "Espresso",
    product_description: "Rich and bold espresso brewed to perfection.",
    product_price: "30000",
    discount_price: "25000",
    product_stock: "50",
    category_id: "1", // specialty coffees
    rating: "4.8",
    order_number: "ORD001",
    created_date: "2024-01-15",
  },
  {
    uuid: "2",
    img_product: img,
    product_name: "Gourmet Popcorn",
    product_description:
      "Deliciously flavored gourmet popcorn, perfect for snacking.",
    product_price: "45000",
    discount_price: "40000",
    product_stock: "30",
    category_id: "2", // gourmet snacks
    rating: "4.6",
    order_number: "ORD002",
    created_date: "2024-01-16",
  },
  {
    uuid: "3",
    img_product: img,
    product_name: "Chocolate Truffles",
    product_description:
      "Decadent chocolate truffles with a variety of fillings.",
    product_price: "60000",
    discount_price: null,
    product_stock: "25",
    category_id: "3", // sweet indulgences
    rating: "4.9",
    order_number: "ORD003",
    created_date: "2024-01-17",
  },
  {
    uuid: "4",
    img_product: img,
    product_name: "Iced Matcha Latte",
    product_description: "Refreshing iced matcha latte with a hint of vanilla.",
    product_price: "35000",
    discount_price: "30000",
    product_stock: "40",
    category_id: "4", // unique beverages
    rating: "4.7",
    order_number: "ORD004",
    created_date: "2024-01-18",
  },
  {
    uuid: "5",
    img_product: img,
    product_name: "Cold Brew Coffee",
    product_description:
      "Smooth and refreshing cold brew coffee, perfect for hot days.",
    product_price: "32000",
    discount_price: null,
    product_stock: "60",
    category_id: "1", // specialty coffees
    rating: "4.8",
    order_number: "ORD005",
    created_date: "2024-01-19",
  },
  {
    uuid: "6",
    img_product: img,
    product_name: "Artisan Cheese Board",
    product_description:
      "A selection of gourmet cheeses, perfect for snacking.",
    product_price: "120000",
    discount_price: "110000",
    product_stock: "15",
    category_id: "2", // gourmet snacks
    rating: "4.9",
    order_number: "ORD006",
    created_date: "2024-01-20",
  },
  {
    uuid: "7",
    img_product: img,
    product_name: "Caramel Pudding",
    product_description: "Creamy caramel pudding topped with whipped cream.",
    product_price: "50000",
    discount_price: null,
    product_stock: "20",
    category_id: "3", // sweet indulgences
    rating: "4.7",
    order_number: "ORD007",
    created_date: "2024-01-21",
  },
  {
    uuid: "8",
    img_product: img,
    product_name: "Herbal Iced Tea",
    product_description:
      "Refreshing herbal iced tea brewed with natural herbs.",
    product_price: "30000",
    discount_price: null,
    product_stock: "45",
    category_id: "4", // unique beverages
    rating: "4.6",
    order_number: "ORD008",
    created_date: "2024-01-22",
  },
  {
    uuid: "9",
    img_product: img,
    product_name: "Baklava",
    product_description: "Sweet and flaky pastry filled with nuts and honey.",
    product_price: "60000",
    discount_price: "55000",
    product_stock: "18",
    category_id: "3", // sweet indulgences
    rating: "4.8",
    order_number: "ORD009",
    created_date: "2024-01-23",
  },
  {
    uuid: "10",
    img_product: img,
    product_name: "Nitro Cold Brew",
    product_description:
      "Creamy and smooth nitro cold brew coffee for a unique experience.",
    product_price: "40000",
    discount_price: null,
    product_stock: "30",
    category_id: "1", // specialty coffees
    rating: "4.9",
    order_number: "ORD010",
    created_date: "2024-01-24",
  },
];
export const orderHistoryDummy = [
  {
    id: 1,
    product_uuid: "1",
    order_number: "ORD001",
    created_date: "2024-10-01",
  },
  {
    id: 2,
    product_uuid: "3",
    order_number: "ORD002",
    created_date: "2024-10-02",
  },
  {
    id: 3,
    product_uuid: "7",
    order_number: "ORD003",
    created_date: "2024-10-03",
  },
];

export const productDetailThunk = createAsyncThunk<
  IDetailProduct[], 
  { uuid: string },
  { rejectValue: { error: Error; status?: number } }
>("productThunk", async (params: { uuid: string }, { rejectWithValue }) => {
  try {
    const url = `http://localhost:8080/product/detail/${params.uuid}`;
    const result: AxiosResponse<IProductDetailResponse> = await axios.get(url);

    if (Array.isArray(result.data.data)) {
      return result.data.data; 
    } else {
      return rejectWithValue({
        error: new Error("Expected an array of products"),
        status: 400,
      });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue({
        error: error.response?.data,
        status: error.status,
      });
    }
    throw error;
  }
});
