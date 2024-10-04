import { useNavigate } from "react-router-dom";
import { FilterCard } from "../../../components/card/FilterCard";
import { ProductCard } from "../../../components/card/ProductCard";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { filterActions } from "../../../redux/slice/filterProductSlice";
import PaginationNumbers from "../../../components/pagination/PaginationNumbers";

export const ProductFilter = () => {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();

  const handleBuyClick = (uuid: string) => {
    navigate(`/detail-product/${uuid}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPage = 6;

  const { isLoading, product, filter, pagination } = useStoreSelector(
    (state) => state.filterProduct
  );

  useEffect(() => {
    const fetchProducts = () => {
      dispatch(
        filterActions.productThunk({
          filters: filter,
          currentPage,
          productsPage,
        })
      );
    };

    fetchProducts();
  }, [dispatch, filter, currentPage]);

  return (
    <div className="px-5 pt-3 md:px-10 lg:px-14 grid gap-5">
      <h1 className="text-heading_mobile lg:text-heading_desktop text-black text-plus-jakarta ml-0">
        Our <span className="text-[#8E6447]">Product</span>
      </h1>
      <div className="grid grid-cols-1 grid-rows-[auto,1fr] lg:grid-cols-[auto,1fr] lg:grid-rows-1 gap-5">
        {/* Filter */}
        <div className="w-[383px]">
          <FilterCard />
        </div>
        {/* Slide Product */}
        <div
          style={{ overflowY: "hidden", scrollbarWidth: "none" }}
          className="w-full grid justify-items-center items-center grid-cols-1 lg:grid-cols-[1fr,1fr] gap-1 h-fit p-5 overflow-x-scroll snap-mandatory snap-x">
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
      </div>
      <PaginationNumbers
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
