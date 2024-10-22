export interface ITransaction_Product {
  transaction_id: number;
  product_id: number;
  size_id: number;
}

export interface ITransactionBody {
  user_id: number;
  payments_id: number;
  shipping_id: number;
  status_id: number;
  subtotal: number;
  tax: number;
  total_discount: number;
  grand_total: number;
  products: ITransaction_Product[];
}
