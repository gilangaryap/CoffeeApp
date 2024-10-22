import { useNavigate } from "react-router-dom";
import { CheckoutHeader } from "./CheckoutHeader";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { CheckoutTotal } from "./CheckoutTotal";

import CheckoutProductCard from "../../../components/card/CheckoutProductCard";
import { useCallback, useEffect } from "react";
import { productDetailCardThunk } from "../../../redux/api/product";

export const OrderSummary = () => {
  const dispatch = useStoreDispatch();
  const { checkout , productInfo } = useStoreSelector((state) => state.checkout);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkout.length > 0) {
      checkout.forEach(item => {
        if (item?.uuid) {
          dispatch(productDetailCardThunk({ uuid: item.uuid }));
          console.log('checkout: ', checkout.map);
        }
      });
    }
  }, [checkout, dispatch]);

  const handleClick = useCallback(() => {
    navigate("/product");
  }, [navigate]);

  console.log("Checkout array:", checkout);

  const orderTotal = checkout.reduce((sum, product) => {
    const price: string | number = productInfo[0]?.discount_price || productInfo[0]?.product_price || 0;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return sum + (numericPrice * (product.count || 0));
  }, 0);  
  const deliveryFee = 0;
  const subTotal = orderTotal + deliveryFee;
  const tax = subTotal * 0.05;
  const total = tax + subTotal

  return (
    <div className="grid gap-10">
      <div className="pt-10 lg:pt-16">
        <p className="text-header text-wrap text-heading_mobile lg:text-heading_desktop font-medium">
          Payment Details
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-[1fr,auto] lg:grid-rows-1 gap-5">
        <div className="flex flex-col gap-4">
          <CheckoutHeader onAddMenuClick={handleClick} />
          {checkout.map((products , index) => (
            <CheckoutProductCard
              key={products.uuid}
              product={products}
              deliveryOption={products.delivery_id || ''}
              productIndex={index} 
            />
          ))}
        </div>
        <div>
           <CheckoutTotal
            order={`IDR ${orderTotal.toLocaleString()}`} // Format to locale string
            delivery={`IDR ${deliveryFee.toLocaleString()}`}
            sub_Total={`IDR ${subTotal.toLocaleString()}`}
            tax={`IDR ${tax.toLocaleString()}`}
            total={`IDR ${total.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
};
