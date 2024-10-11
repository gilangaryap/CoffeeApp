import { OrderFilter } from "./OrderFilter";
import { OrderItemCard } from "../../../components/card/OrderItemCard";
import PaginationNumbers from "../../../components/pagination/PaginationNumbers";
import { useOrderHistory } from "./useOrderHistory";

export const OrderList = () => {
  const {
    history,
    isLoading,
    pagination,
    currentPage,
    activeStatus,
    fetchOrderHistory,
    setCurrentPage,
  } = useOrderHistory();

  return (
    <main className="px-5 md:px-10 lg:px-14 grid gap-5">
      <section className="h-[20vh] grid grid-cols-[auto,1fr] gap-7 items-center pt-10 lg:pt-20">
        <p className="text-header text-wrap text-3xl font-medium">History Order</p>
        <div>
          <p className="bg-gray-200 px-4 py-2 w-fit">{history.length}</p>
        </div>
      </section>

      <section className="w-full grid grid-cols-1 grid-rows-[1fr,auto] lg:grid-cols-[70%,30%] lg:grid-rows-1 gap-5">
        <div className="grid grid-cols-1 gap-9">
          <OrderFilter activeStatus={activeStatus} onStatusChange={fetchOrderHistory} />
          {isLoading && <p>Loading...</p>}
          {history.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {history.map((order) => (
                <OrderItemCard key={order.id} product={order} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-5 border rounded-lg">
              <p className="text-gray-600">No Order History</p>
            </div>
          )}
          <div className="flex flex-row gap-4 items-center justify-center">
            <PaginationNumbers
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
};