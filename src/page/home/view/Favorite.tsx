import { ProductCard } from "../../../components/card/ProductCard";
import img from "../../../assets/images/8d0f31b42b08e11e97f7bc8c06c07705.jpeg";
import { useNavigate } from "react-router-dom";

const favoriteProducts = [
  {
    uuid: "1",
    img_product: img, // Changed to be just the image string
    product_name: "Wireless Headphones",
    product_description:
      "High-quality wireless headphones with noise cancellation.",
    product_price: "999,000",
    rating:"5"
  },
  {
    uuid: "2",
    img_product: img, // Changed to be just the image string
    product_name: "Smart Watch - Model A",
    product_description: "Stay connected with notifications on your wrist.",
    product_price: "1,299,000",
    rating:"5"
  },
  {
    uuid: "3",
    img_product: img, // Changed to be just the image string
    product_name: "Smart Watch - Model B",
    product_description: "Track your fitness and health metrics.",
    product_price: "1,499,000",
    rating:"5"
  },
  {
    uuid: "4",
    img_product: img, // Changed to be just the image string
    product_name: "Smart Watch - Model C",
    product_description: "Stylish design with customizable faces.",
    product_price: "1,799,000",
    rating:"5"
  },
  // Add more favorite products if needed
];

export const Favorite = () => {
  const navigate = useNavigate();

  const handleBuyClick = (uuid: string) => {
    navigate(`/product/${uuid}`);
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
      <div className="slide-content grid justify-items-center items-center grid-cols-[1fr,1fr,1fr,1fr] gap-9 h-fit bg-white overflow-x-scroll snap-mandatory snap-x lg:overflow-x-auto lg:snap-none lg:grid-cols-4">
        {favoriteProducts.map((product) => (
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
