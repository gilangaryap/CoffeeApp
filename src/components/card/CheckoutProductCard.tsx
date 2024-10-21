import { XMarkIcon } from "@heroicons/react/16/solid";
import { checkoutAction } from "../../redux/slice/checkoutSlice";
import { useStoreDispatch } from "../../redux/hook";
import { ITransactionProduct } from "../../redux/types/product";

interface ICheckoutProductCard {
  product: ITransactionProduct;
  productIndex: number;
  deliveryOption: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discountPrice?: string;
}

export default function CheckoutProductCard({ product, productIndex, deliveryOption, productName, productImage, productPrice, discountPrice}: ICheckoutProductCard) {
  const dispatch = useStoreDispatch();
  const renderDeliveryOption = () => {
    switch (deliveryOption) {
      case "Dine in":
        return "Dine In";
      case "Door Delivery":
        return "Door Delivery";
      case "Pick Up":
        return "Pick Up";
      default:
        return "Dine In";
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[auto,1fr] items-center gap-3 p-3 ">
      <div className="w-auto h-auto grid justify-center items-center">
        <img
          className="w-[178px] h-[170px] object-cover"
          src={productImage}
          alt={productName}
        />
      </div>

      <div className="grid grid-cols-[1fr,auto] md:grid-cols-[1fr,auto] h-full pr-5">
        <div className="grid grid-cols-1">
          <h1 className="text-white text-xs h-fit bg-red-700 rounded-3xl px-3 py-1 w-fit">
            Flash Sale!
          </h1>

          <h1 className="font-bold text-lg">{productName}</h1>

          <h1 className="text-lg text-text">
            {product.count}pcs |{" "}
            {product.size_id === 1
              ? "Regular"
              : product.size_id === 2
              ? "Medium"
              : product.size_id === 3
              ? "Large"
              : ""}{" "}
            |{" "}
            {product.ice_hot === 1 ? "Ice" : product.ice_hot === 2 ? "Hot" : ""}{" "}
            | {renderDeliveryOption()}
          </h1>

          <div className="grid grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-1 h-fit">
            {discountPrice && (
              <div className="line-through text-red-800">
                <p>{discountPrice}</p>
              </div>
            )}
            <div className="pl-5 text-xl text-[#FF8906]">
              <p>IDR {productPrice}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={() => dispatch(checkoutAction.removeProduct(productIndex))}
            className="border-2 border-red-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 text-red-500">
              <XMarkIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
