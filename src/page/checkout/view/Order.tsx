import { useNavigate } from "react-router-dom";
import { CheckoutHeader } from "./CheckoutHeader";
import CheckoutProductCard from "../../../components/card/CheckoutProductCard";
import { productDummy } from "../../../redux/api/product";
import { useStoreSelector } from "../../../redux/hook";
import { Total } from "./Total";

export const Order = () => {
  const productDetail = productDummy;

  const products = useStoreSelector((state) => state.checkout.checkout);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };
  
  return (
    <div className=" grid gap-10">
      <div className="pt-10 lg:pt-16">
        <p className="text-header  text-wrap text-heading_mobile lg:text-heading_desktop font-medium  ">
          Payment Details
        </p>
      </div>
      <div  className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-[1fr,auto] lg:grid-rows-1 gap-5">

        <div className="flex flex-col gap-4">
          <CheckoutHeader onAddMenuClick={handleClick} />
          {products.map((product, index) => (
            <CheckoutProductCard
              product={product}
              productIndex={index}
              productImage={productDetail[0].img_product}
              productName={productDetail[0].product_name}
              productPrice={productDetail[0].product_price}
              discountPrice={productDetail[0].discount_price || ""}
              deliveryOption={product.delivery_id || ""}
            />
          ))}
        </div>
        <div>
          <Total order="40.000" delivery="10.000" sub_Total="80.000" tax="5.000" />
        </div>
      </div>
    </div>
  );
};
