import { useNavigate } from "react-router-dom";
import { CheckoutHeader } from "./CheckoutHeader";
import CheckoutProductCard from "../../../components/card/CheckoutProductCard";
import { productDummy } from "../../../redux/api/product";
import { useStoreSelector } from "../../../redux/hook";

export const Order = () => {
  const productDetail = productDummy;

  const products = useStoreSelector((state) => state.checkout.checkout);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };

  return (
    <div>
      <CheckoutHeader onAddMenuClick={handleClick} />
      {products.map((product, index) => (
        <CheckoutProductCard
          product={product}
          productIndex={index}
          productImage={productDetail[0].img_product}
          productName={productDetail[0].product_name}
          productPrice={productDetail[0].product_price}
          discountPrice={productDetail[0].discount_price || ''}
          deliveryOption={product.delivery_id || ''}
        />
      ))}
    </div>
  );
};
