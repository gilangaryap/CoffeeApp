import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../../components/card/ProductCard";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import PaginationNumbers from "../../../components/pagination/PaginationNumbers";
import { useEffect, useState } from "react";
import { filterActions } from "../../../redux/slice/filterProductSlice";

export const Recommendation = () => {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();

  const handleBuyClick = (uuid: string) => {
    navigate(`/detail-product/${uuid}`);
  };

  const { isLoading, product, pagination } = useStoreSelector((state) => state.filterProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPage = 4;

  useEffect(() => {
    const fetchProducts = () => {
      dispatch(
        filterActions.productThunk({
          filters:{},
          currentPage,
          productsPage,
        })
      );
    };

    fetchProducts();
  }, [dispatch, currentPage]);

  return (
    <div className="grid grid-cols-1">
      <h1 className="text-heading_mobile lg:text-heading_desktop text-black text-plus-jakarta ml-0 pb-10">
        Recommendation <span className="text-[#8E6447]">For You</span>
      </h1>
      <div style={{ overflowY: "hidden", scrollbarWidth: "none" }} className="w-full grid justify-items-center items-center grid-cols-1 lg:grid-cols-[1fr,1fr,1fr,1fr] gap-1 h-fit overflow-x-scroll snap-mandatory snap-x">
      {/* Product */}
      {isLoading ? (
            <p>Loading...</p>
          ) : product.length > 0 ? (product.map((productItem) => (
              <ProductCard
                onBuyClick={handleBuyClick}
                product={productItem}
                key={productItem.uuid}
                imgError=""
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
      </div>
      <PaginationNumbers
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
