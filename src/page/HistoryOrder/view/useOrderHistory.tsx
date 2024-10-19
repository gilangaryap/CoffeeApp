import { useCallback, useState } from "react";
import { historyOrderActions } from "../../../redux/slice/historyOrderSlice";
import { useStoreDispatch, useStoreSelector } from "../../../redux/hook";

export const useOrderHistory = () => {
  const dispatch = useStoreDispatch();
  const { history, isLoading, pagination } = useStoreSelector((state) => state.historyOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState("");
  const historyPerPage = 1;

  const authState = "3a76d970-ea39-4631-9c15-221cfc136c7d";

  const fetchOrderHistory = useCallback(
    (status: string) => {
      const params = {
        filters: { status },
        currentPage,
        historyPerPage,
        uuid: authState,
      };
      dispatch(historyOrderActions.historyOrderThunk(params));
      setActiveStatus(status);
    },
    [dispatch, authState, currentPage]
  );
  return {
    history,
    isLoading,
    pagination,
    currentPage,
    activeStatus,
    fetchOrderHistory,
    setCurrentPage,
  };
};
