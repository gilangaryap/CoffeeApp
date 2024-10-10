export interface IProductBody {
    uuid: string;
    product_name: string;
    product_price: string;
    product_description: string;
    discount_price: string;
    category_name: string;
    img_product: string;
    rating:string;
  }
  
  export interface IDetailProduct {
    imgProduct: {
      img_1?: string;
      img_2?: string;
      img_3?: string;
    };
    product: {
      uuid?: string;
      count: number;
      product_name?: string;
      product_price: number;
      discount_price: number;
      product_description?: string;
      rating: string;
    }
  
  }
  
  export interface ITransactionProduct {
    uuid?: string;
    count: number;
    size_id?: number;
    ice_hot: number;
    delivery_id?: string;
    payment_id?: string;
  }
  
  export interface IFilters {
    category?: string;
    sortBy?: string 
    searchText?: string;
    min_price?: string;
    max_price?: string;
  }
  
  export interface IProductBody {
    uuid: string;
    image: string;
    product_name: string;
    category: string;
    created_at: string;
    description: string;
    price: number;
  }