import { ImageDisplay } from "./ImageDisplay";
import { ProductInfo } from "./ProductInfo";
import { productDummy } from "../../../redux/api/product";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { selectProductActions } from "../../../redux/slice/selectProduct";
import { useState } from "react";
import { QuantityInput } from "../../../components/Input/QuantityInput";
import { IceHotInput } from "../../../components/Input/IceHotInput";
import { SizeInput } from "../../../components/Input/SizeInput";
import { MessageModal } from "../../../components/alert/MessageModal";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { checkoutAction } from "../../../redux/slice/checkoutSlice";
import { ITransactionProduct } from "../../../redux/types/product";

const images = ["url_to_image1.jpg", "url_to_image2.jpg", "url_to_image3.jpg"];

export const DetailProduct = () => {
  const dispatch = useStoreDispatch();
  const { currentImage, count, selectedSize, selectedOption } =
    useStoreSelector((state) => state.selectProduct);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    header: string;
    body: string;
  } | null>(null);

  const navigate = useNavigate();

  const product = productDummy;

  const handleImageClick = (img: string) => {
    dispatch(selectProductActions.setCurrentImage(img));
  };

  const handleIncrement = () => {
    dispatch(selectProductActions.incrementCount());
  };

  const handleDecrement = () => {
    dispatch(selectProductActions.decrementCount());
  };

  const handleSizeChange = (size: number) => {
    dispatch(selectProductActions.setSize(size));
  };

  const handleOptionChange = (option: number) => {
    dispatch(selectProductActions.setOption(option));
  };

  const handleBasketClick = () => {
    console.log("Selected Size:", selectedSize);
    console.log("Selected Option:", selectedOption);
    if (selectedSize === undefined || selectedOption === undefined) {
      setMessage({
        type: "error",
        header: "Error",
        body: "Please select both size and hot/ice option before buying.",
      });
    } else {
      setMessage({
        type: "success",
        header: "Success",
        body: `Successful ${product[0].product_name} products in the basket`,
      });
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  const handleBuy = () => {
    if (selectedSize !== undefined && selectedOption !== undefined) {
      const defaultProduct: ITransactionProduct = {
        product_id: product[0].uuid,
        count,
        size_id: selectedSize,
        ice_hot: selectedOption,
        delivery_id: undefined,
        payment_id: undefined,
      };
      dispatch(checkoutAction.checkoutProduct(defaultProduct));
      navigate("/checkout");
    }
  };

  return (
    <div className="w-full grid md:grid-cols-2 gap-4 pt-14">
      <MessageModal message={message} onClose={closeMessage} />
      <ImageDisplay
        currentImage={currentImage}
        images={images}
        onImageClick={handleImageClick}
      />
      <div className="grid py-5 gap-3 ">
        <ProductInfo
          product_name={product[0].product_name}
          product_price={product[0].product_price}
          discount_price={product[0].discount_price || ""}
          product_description={product[0].product_description}
          rating={product[0].rating}
          key={product[0].uuid}
        />
        <QuantityInput
          count={count}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
        <SizeInput
          selectedSize={selectedSize}
          onSizeChange={handleSizeChange}
        />
        <IceHotInput
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
        />
        <div className="grid grid-cols-2 gap-3">
          <PrimaryButton
            onClick={handleBuy}
            text="Buy"
            style="w-full"
            disabled={
              selectedSize === undefined || selectedOption === undefined
            }
          />
          <button
            onClick={handleBasketClick}
            className="rounded-xl py-2 border-2 w-full border-primary bg-transparent text-sm flex justify-center items-center gap-3 text-primary">
            <div className="w-6 h-auto">
              <ShoppingCartIcon />
            </div>
            Add to chart
          </button>
        </div>
      </div>
    </div>
  );
};
