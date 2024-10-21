import { useNavigate } from "react-router-dom";
import { CheckoutHeader } from "./CheckoutHeader";
import CheckoutProductCard from "../../../components/card/CheckoutProductCard";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { Total } from "./Total";
import { useEffect } from "react";
import { productDetailCardThunk } from "../../../redux/api/product";

export const Order = () => {
  const dispatch = useStoreDispatch();
  const { checkout, productInfo } = useStoreSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout[0]?.uuid) {
      dispatch(productDetailCardThunk({ uuid: checkout[0].uuid }));
      console.log('uuid: ',checkout[0].uuid)
    }
  }, [checkout, dispatch]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };

  const hasProductInfo = productInfo.length > 0;

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
          {checkout.map((products, index) => (
            <CheckoutProductCard
              key={index}
              product={products}
              productIndex={index}
              deliveryOption={products.payment_id || ''}
              productImage={hasProductInfo ? productInfo[0].img_product : ''}
              productName={hasProductInfo ? productInfo[0].product_name : ''}
              productPrice={hasProductInfo ? productInfo[0].product_price : 0}
              discountPrice={hasProductInfo ? productInfo[0].discount_price : ''}
            />
          ))}
        </div>
        <div>
          <Total
            order="40.000"
            delivery="10.000"
            sub_Total="80.000"
            tax="5.000"
          />
        </div>
      </div>
    </div>
  );
};
