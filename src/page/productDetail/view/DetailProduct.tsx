import { ImageDisplay } from "./ImageDisplay"
import { ProductInfo } from "./ProductInfo";
import { productDummy } from "../../../redux/api/product";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { selectProductActions } from '../../../redux/slice/selectProduct';
import { QuantityInput } from "../../../components/input/QuantityInput";
import { SizeInput } from "../../../components/input/SizeInput";
import { IceHotInput } from "../../../components/input/IceHotInput";


const images = [
  'url_to_image1.jpg',
  'url_to_image2.jpg',
  'url_to_image3.jpg',
];

export const DetailProduct = () => {
  const dispatch = useStoreDispatch();
  const { currentImage, count, selectedSize, selectedOption } = useStoreSelector((state) => state.selectProduct);

  const product = productDummy

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

  const handleBuyClick = () => {
    if (selectedSize === undefined || selectedOption === undefined) {
      alert("Please select both size and hot/ice option before buying.");
    } else {
      // Proceed with buying logic here
      alert("Proceeding to buy...");
    }
  };
  return (
    <div>
      <ImageDisplay currentImage={currentImage} images={images} onImageClick={handleImageClick} />
      <ProductInfo product_name={product[0].product_name} product_price={product[0].product_price} discount_price={product[0].discount_price || ''} product_description={product[0].product_description} rating={product[0].rating} key={product[0].uuid}/>
      <QuantityInput count={count} onDecrement={handleDecrement} onIncrement={handleIncrement} />
      <SizeInput selectedSize={selectedSize} onSizeChange={handleSizeChange} />
      <IceHotInput selectedOption={selectedOption} onOptionChange={handleOptionChange} />
      <div>
        <PrimaryButton onClick={handleBuyClick} text="Buy" style="w-full" disabled={selectedSize === undefined || selectedOption === undefined} />
      </div>
    </div>
  );
}
