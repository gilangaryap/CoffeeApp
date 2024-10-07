import { ChangeEvent } from "react";
import { useStoreDispatch, useStoreSelector } from "../../redux/hook";
import { filterActions } from "../../redux/slice/filterProductSlice";
import { IFilters } from "../../redux/types/product";
import { SearchInput } from "../Input/SearchInput";
import { CategoryInput } from "../Input/CategoryInput";
import { SortInput } from "../Input/SortInput";

export const FilterCard = () => {
  const dispatch = useStoreDispatch();
  const { filter } = useStoreSelector((state) => state.filterProduct);
  const { productThunk, setFilter ,resetFilter } = filterActions;

  const onApply = () => {
    dispatch(
      productThunk({ filters: filter, currentPage: 1, productsPage: 6 })
    );
  };

  const onReset = () => {
    dispatch(resetFilter());
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterTemp: IFilters = { ...filter, searchText: e.target.value };
    dispatch(setFilter(filterTemp));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const filterTemp: IFilters = { ...filter, category: name };
    dispatch(setFilter(filterTemp));
  };

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      const filterTemp: IFilters = {
        ...filter,
        sortBy: name as IFilters["sortBy"],
      };
      dispatch(setFilter(filterTemp));
    }
  };

  const categories = [ "specialty coffees", "gourmet snacks", "sweet indulgences", "unique beverages"];
  const sortOptions = ["cheap", "priciest", "a-z", "z-a"];
  return (
    <div className="hidden lg:block w-full">
      <div className="filter-menu basis-1/3 bg-black rounded-lg flex flex-col p-8 gap-4 h-max">
        {/* <FilterMenu onReset={onReset} /> */}
        <section className="filter flex flex-row justify-between text-white w-full">
          <h4 className="text-2xl">Filter</h4>
          <button className="text-lg" onClick={onReset}>
            Reset Filter
          </button>
        </section>

        <SearchInput value={filter.searchText} onChange={handleSearchChange} />

        <section className="category text-white grid gap-4">
          <p className="text-xl text-white">Category</p>
          <form className="flex flex-col gap-4">
            {categories.map((category) => (
              <CategoryInput
                key={category}
                category={category}
                selectedCategory={filter.category || ""}
                onChange={handleCategoryChange}
              />
            ))}
          </form>

          <p className="text-xl text-white">Sort By</p>
          <form className="flex flex-col gap-4">
            {sortOptions.map((sortBy) => (
              <SortInput
                key={sortBy}
                sortBy={sortBy}
                selectedSort={filter.sortBy || ""}
                onChange={handleSortChange}
              />
            ))}
          </form>
        </section>

        {/* <PriceRange /> */}

        <section>
          <button
            onClick={onApply}
            className="bg-[#FF8906] w-full h-8 rounded-lg">
            Apply Filter
          </button>
        </section>
      </div>
    </div>
  );
};
