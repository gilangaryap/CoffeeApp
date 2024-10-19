import { OrderFilter } from "./OrderFilter";
import { OrderItemCard } from "../../../components/card/OrderItemCard";
import PaginationNumbers from "../../../components/pagination/PaginationNumbers";
import { useOrderHistory } from "./useOrderHistory";
import { useEffect } from "react";

export const OrderList = () => {
  const { history, isLoading, pagination, currentPage, activeStatus, fetchOrderHistory, setCurrentPage,} = useOrderHistory();

  useEffect(() => {
    fetchOrderHistory(activeStatus);
  }, [currentPage, activeStatus, fetchOrderHistory]);

  return (
    <div>
      <section className="grid grid-cols-1 grid-rows-[1fr,auto] lg:grid-rows-1 gap-5">
        <div className="grid grid-cols-1 gap-9">
          <OrderFilter activeStatus={activeStatus} onStatusChange={fetchOrderHistory} />
          {isLoading && <p>Loading...</p>}
          {history.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 w-full">
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
    </div>
  );
};