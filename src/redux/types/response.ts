import { IHistoryOrderBody } from "./historyOrder";
import { IDetailCardProduct, IDetailProduct, IProductBody } from "./product";

interface IPaginationMeta {
  totalData?: number;
  totalPage?: number;
  page: number;
  prevLink: string | null;
  nextLink: string | null;
}

export interface IBasicResponse {
  msg: string;
  data: unknown;
  err?: string;
  meta?: IPaginationMeta;
}

export interface IAuthResponse extends IBasicResponse {
  data: Array<{
    token: string;
    id: string;
  }>;
}

/* export interface IUserResponse extends IBasicResponse {
  data: IProfileBody[];
}

export interface IPromoResponse extends IBasicResponse {
  data: IPromoBody[];
}

export interface IRegisterResponse extends IBasicResponse {
  data: IUserBody[];
}

export interface ITestimonialResponse extends IBasicResponse {
  data: ITestimonialBody[];
}
  */

export interface IHistoryResponse extends IBasicResponse {
  data: IHistoryOrderBody[];
  prevLink: string | null;
  nextLink: string | null;
  currentPage: number;
  totalPages: number;
} 

export interface IProductDetailResponse extends IBasicResponse {
  data: IDetailProduct;
}

export interface IProductDetailCardResponse extends IBasicResponse {
  data: IDetailCardProduct[];
}

export interface IProductResponse extends IBasicResponse {
  data: IProductBody[];
  prevLink: string | null;
  nextLink: string | null;
  currentPage: number;
  totalPages: number;
}
