import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { MessageModal } from "../../../components/alert/MessageModal";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { IceHotInput } from "../../../components/Input/IceHotInput";
import { QuantityInput } from "../../../components/Input/QuantityInput";
import { SizeInput } from "../../../components/Input/SizeInput";
import { ImageDisplay } from "./ImageDisplay";
import { useProductDetail } from "./ProductHandlers";
import { ProductInfo } from "./ProductInfo";

export const DetailProduct = () => {
  const {
    count,
    message,
    imagesArray,
    selectedSize, 
    currentImage,
    productDetail,
    selectedOption,
    closeMessage,
    handleImageClick,
    handleIncrement,
    handleDecrement,
    handleSizeChange,
    handleOptionChange,
    handleBasketClick,
    handleBuy,
  } = useProductDetail();

  return (
    <div className="w-full grid md:grid-cols-2 gap-4 pt-14">
      <MessageModal message={message} onClose={closeMessage} />
      <ImageDisplay
        currentImage={currentImage}
        images={imagesArray}
        onImageClick={handleImageClick}
      />
      <div className="grid py-5 gap-3">
        <ProductInfo
          product_name={productDetail.length > 0 ? productDetail[0].product.product_name || "" : ""}
          product_price={productDetail.length > 0 ? productDetail[0].product.product_price || 0 : 0}
          discount_price={productDetail.length > 0 ? productDetail[0].product.discount_price || 0 : 0}
          product_description={productDetail.length > 0 ? productDetail[0].product.product_description || "" : ""}
          rating={productDetail.length > 0 ? productDetail[0].product.rating || '' : ''}
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
            style="w-full text-sm"
            disabled={selectedSize === undefined || selectedOption === undefined}
          />
          <button
            onClick={handleBasketClick}
            className="rounded-xl py-2 border-2 w-full border-primary bg-transparent text-sm flex justify-center items-center gap-3 text-primary">
            <div className="w-6 h-auto">
              <ShoppingCartIcon />
            </div>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
