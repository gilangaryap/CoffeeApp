import { useState } from "react";

export const useCheckout = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirmCheckout = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setModalOpen(false);
      setMessageModalOpen(true);
    }, 200);
  };

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (review: string, rating: number) => {
    console.log("Review submitted:", review, "Rating:", rating);
    setMessageModalOpen(false);
    setReviewModalOpen(false);
  };

  return {
    isModalOpen,
    isLoading,
    isSuccess,
    isMessageModalOpen,
    isReviewModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleConfirmCheckout,
    handleCloseMessageModal,
    handleReviewSubmit,
  };
};
