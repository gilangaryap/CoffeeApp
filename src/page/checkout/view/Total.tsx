import { useState } from "react";
import { CheckoutModal } from "../../../components/alert/CheckoutModal";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { TestimonialInputCard } from "../../../components/card/TestimonialInputCard";
import { CheckoutMessageModal } from "../../../components/alert/CheckoutMessageModal";

interface TotalProps {
  order: string;
  delivery: string;
  tax: string;
  sub_Total: string;
}

export const Total = ({ order, delivery, tax, sub_Total }: TotalProps) => {
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

  const modalHeader = isLoading
    ? "Processing your order..."
    : isSuccess
    ? "Order Successful!"
    : "";

  const modalBody = isLoading
    ? "Please wait while we process your payment."
    : isSuccess
    ? "Thank you for your order! You will receive a confirmation email shortly."
    : "";

  const handleReviewSubmit = (review: string, rating: number) => {
    console.log("Review submitted:", review, "Rating:", rating);
    setMessageModalOpen(false);
    setReviewModalOpen(false);
  };

  return (
    <div className="grid gap-11">
      <p className="text-2xl font-medium">Total</p>

      <div className="w-full border border-text rounded-xl border-opacity-10">
        <div className="flex-col flex gap-4 p-4">
          <div className="flex-row flex justify-between">
            <div className="font-bold text-xl mb-2 text-text">Order</div>
            <div className="font-bold text-xl mb-2 text-black">Rp {order}</div>
          </div>

          <div className="flex-row flex justify-between">
            <div className="font-bold text-xl mb-2 text-text">Delivery</div>
            <div className="font-bold text-xl mb-2 text-black">Rp {delivery}</div>
          </div>

          <div className="flex-row flex justify-between">
            <div className="font-bold text-xl mb-2 text-text">Tax</div>
            <div className="font-bold text-xl mb-2 text-black">Rp {tax}</div>
          </div>

          <div className="flex-row flex justify-between">
            <div className="font-bold text-xl mb-2 text-text">Sub Total</div>
            <div className="font-bold text-xl mb-2 text-black">Rp {sub_Total}</div>
          </div>

          <PrimaryButton
            onClick={handleOpenModal}
            text="Checkout"
            style="w-full font-bold"
          />

          <p className="text-xl text-gray-400">
            *Click Checkout to continue payment
          </p>

          <CheckoutModal
            textBody="Are you sure you want to proceed with the checkout?"
            textHeader={`Checkout Confirmation : ${isLoading}`}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmCheckout}
          />
          <CheckoutMessageModal
            isOpen={isMessageModalOpen}
            textBody={modalBody}
            textHeader={modalHeader}
            onConfirm={handleCloseMessageModal} 
          />
          {isSuccess && isReviewModalOpen && (
            <TestimonialInputCard onSubmit={handleReviewSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};
