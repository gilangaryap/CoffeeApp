import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface IconButtonProps {
  onBuy: () => void;
  onAddToCart: () => void;
  buyText?: string;
  addToCartText?: string;
  addToCartIcon?: React.ReactNode;
}
export const IconButton = ({onBuy,onAddToCart,buyText = "Buy",addToCartText = "Add to cart",addToCartIcon,}: IconButtonProps) => {
  return (
    <div className="flex flex-row gap-2 justify-between">
      <button
        onClick={onBuy}
        className="bg-orange-400 rounded-xl py-2 w-full text-black text-sm"
      >
        {buyText}
      </button>
      <button
        onClick={onAddToCart}
        className="rounded-xl py-2 border-2 w-full border-primary bg-transparent text-sm flex justify-center items-center gap-3 text-primary"
      >
        {addToCartIcon ? addToCartIcon : (
          <div className="w-6 h-auto">
            <ShoppingBagIcon/>
          </div>
        )}
        {addToCartText}
      </button>
    </div>
  )
};
