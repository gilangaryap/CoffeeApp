import { DetailProduct } from "./view/DetailProduct";
import { Recommendation } from "./view/Recommendation";

export const ProductDetail = () => {
  return (
    <div className=" grid gap-10 px-5 md:px-10 lg:px-14">
      <DetailProduct />
      <Recommendation/>
    </div>
  );
};
