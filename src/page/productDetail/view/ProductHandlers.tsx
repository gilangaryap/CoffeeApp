import { useNavigate, useParams } from "react-router-dom";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { producDetailtAction } from "../../../redux/slice/productDetailSlice";
import { selectProductActions } from "../../../redux/slice/selectProduct";
import { ITransactionProduct } from "../../../redux/types/product";
import { checkoutAction } from "../../../redux/slice/checkoutSlice";

export const useProductDetail = () => {

    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();
    const dispatch = useStoreDispatch();
    const { currentImage, count, selectedSize, selectedOption } = useStoreSelector((state) => state.selectProduct);
    const { productDetail } = useStoreSelector((state) => state.detailProduct);
    
    const [message, setMessage] = useState<{ type: "success" | "error"; header: string; body: string; } | null>(null);
  
    useEffect(() => {
      if (uuid) {
        dispatch(producDetailtAction.productDetailThunk({ uuid }));
      }
    }, [dispatch, uuid]);  
  
    useEffect(() => {
      if (productDetail.length > 0 && productDetail[0].images && productDetail[0].images.img_1) {
        dispatch(selectProductActions.setCurrentImage(productDetail[0].images.img_1));
      }
    }, [productDetail, dispatch]);
    
    const imagesArray = productDetail.length > 0 ? [
      productDetail[0].images?.img_1,
      productDetail[0].images?.img_2,
      productDetail[0].images?.img_3,
    ].filter((img): img is string => img !== undefined) : [];
  
  
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
          body: `Successfully added ${productDetail[0].product.product_name} to the basket`,
        });
      }
    };
  
    const closeMessage = () => {
      setMessage(null);
    };
  
    const handleBuy = () => {
      if (selectedSize !== undefined && selectedOption !== undefined) {
        const defaultProduct: ITransactionProduct = {
          uuid: productDetail[0].product.uuid,
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
  
    return {
      imagesArray,
      currentImage,
      count,
      message,
      productDetail,
      selectedSize, 
      selectedOption, 
      setMessage,
      closeMessage,
      handleImageClick,
      handleIncrement,
      handleDecrement,
      handleSizeChange,
      handleOptionChange,
      handleBasketClick,
      handleBuy,
    };
  };