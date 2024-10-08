import { ImageDisplay } from "./ImageDisplay";
import { ProductInfo } from "./ProductInfo";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { selectProductActions } from "../../../redux/slice/selectProduct";
import { useEffect, useState } from "react";
import { QuantityInput } from "../../../components/Input/QuantityInput";
import { IceHotInput } from "../../../components/Input/IceHotInput";
import { SizeInput } from "../../../components/Input/SizeInput";
import { MessageModal } from "../../../components/alert/MessageModal";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { checkoutAction } from "../../../redux/slice/checkoutSlice";
import { ITransactionProduct } from "../../../redux/types/product";
import { productDetailAction } from "../../../redux/slice/productDetailSlice";
import { useNavigate, useParams } from "react-router-dom";

export const DetailProduct = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const { productDetail } = useStoreSelector((state) => state.detailProduct);
  const { currentImage, count, selectedSize, selectedOption } = useStoreSelector((state) => state.selectProduct);
  const [message, setMessage] = useState<{ type: "success" | "error"; header: string; body: string; } | null>(null);

  useEffect(() => {
    if (uuid) {
      dispatch(productDetailAction.productDetailThunk({ uuid }));
    }
  }, [dispatch, uuid]);

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
        body: `Successfully added ${productDetail.product.product_name} to the basket`,
      });
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  const handleBuy = () => {
    if (selectedSize !== undefined && selectedOption !== undefined) {
      const defaultProduct: ITransactionProduct = {
        product_id: productDetail.product.uuid,
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

  useEffect(() => {
    if (productDetail.imgProduct?.img_1) {
      dispatch(selectProductActions.setCurrentImage(productDetail.imgProduct.img_1));
    }
  }, [productDetail, dispatch]);

  const imagesArray = [
    productDetail.imgProduct?.img_1,
    productDetail.imgProduct?.img_2,
    productDetail.imgProduct?.img_3,
  ].filter((img): img is string => img !== undefined);

  if (!productDetail.product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full grid md:grid-cols-2 gap-4 pt-14">
      <MessageModal message={message} onClose={closeMessage} />
      <ImageDisplay
        currentImage={currentImage}
        images={imagesArray}
        onImageClick={handleImageClick}
      />
      <div className="grid py-5 gap-3 ">
        <ProductInfo
          product_name={productDetail.product?.product_name || ""}
          product_price={productDetail.product?.product_price || 0}
          discount_price={productDetail.product?.discount_price || 0}
          product_description={productDetail.product?.product_description || ""}
          rating={productDetail.product?.rating || ''}
          key={productDetail.product?.uuid}
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
