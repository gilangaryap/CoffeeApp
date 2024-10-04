import { ProductCard } from "../../../components/card/ProductCard";
import { useNavigate } from "react-router-dom";
import { productDummy } from "../../../redux/api/product";

export const Favorite = () => {
  const navigate = useNavigate();
  const favoriteProducts = productDummy;
  const handleBuyClick = (uuid: string) => {
    navigate(`/detail-product/${uuid}`);
  };

  return (
    <div className="pl-5 pr-5 md:pl-5 md:pr-5 lg:pl-20 lg:pr-5 min-h-screen grid grid-rows-[auto,1fr] items-center justify-center py-5 lg:py10">
      <div className=" grid items-center justify-center p-4 gap-1">
        <h1 className="text-center text-heading_mobile lg:text-heading_desktop pb-4">
          Here is People’s <span className="text-[#8E6447]">favorite</span>
        </h1>

        <div className="bg-orange-500 w-16 h-2 mx-auto"></div>

        <p className="text-text text-base text-center">
          Let’s choose and have a bit taste of people’s favorite. It might be
          yours too!
        </p>
      </div>
      <div style={{ overflowY: "hidden", scrollbarWidth: "none" }} className="slide-content grid justify-items-center items-center grid-cols-[1fr,1fr,1fr,1fr] gap-9 h-fit bg-white overflow-x-scroll snap-mandatory snap-x lg:overflow-x-auto lg:snap-none lg:grid-cols-4">
        {favoriteProducts.slice(0, 4).map((product) => (
          <ProductCard
            product={product}
            key={product.uuid}
            onBuyClick={handleBuyClick}
            imgError="https://example.com/default-image.jpg"
          />
        ))}
      </div>
    </div>
  );
};
