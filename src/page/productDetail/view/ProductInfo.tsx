interface ProductInfoProps {
  name: string;
  discountPrice: number;
  price: number;
  description: string;
  rating: number;
}

export const ProductInfo = ({ description, discountPrice, name, price, rating}: ProductInfoProps) => {
  return (
    <div className="py-5 pr-10 pl-10 md:pr-14 md:pl-14 lg:pl-5 lg:pr-20 gap-3 flex flex-col justify-center">
      <h2 className="text-lg font-bold text-white p-3 bg-[#D00000] w-fit rounded-3xl">
        FLASH SALE!
      </h2>
      <h1 className="font-bold text-heading_mobile lg:text-heading_desktop">
        {name}
      </h1>
      <div className="grid grid-cols-[auto,1fr] items-center">
        <p className="text-xs line-through text-red-800 pr-2">
          IDR {discountPrice}
        </p>
        <p className="text-2xl text-[#FF8906]">IDR {price}</p>
      </div>
      <div className="grid grid-cols-[auto,1fr]">
        <div className="text-[#FF8906]">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="star">
              ★
            </span>
          ))}
        </div>
        <div className="pl-1">{rating}.0</div>
      </div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  );
};
