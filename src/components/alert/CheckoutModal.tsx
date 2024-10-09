import { PrimaryButton } from "../button/PrimaryButton";
import { TextButton } from "../button/TextButton";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export const CheckoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: CheckoutModalProps) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="show fixed inset-0 bg-black bg-opacity-50 modal-bg flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded shadow-lg max-w-md uw:max-w-2xl w-3/4 tbt:w-full text-center">
        <h2 className="text-sm tbt:text-2xl uw:text-4xl font-semibold mb-4">
          Confirm Checkout
        </h2>
        <p className="text-xs xsm:text-sm tbt:text-base uw:text-2xl mb-6">
          Are you sure you want to checkout?
        </p>
        <div className="flex justify-center gap-5">
          <PrimaryButton style="px-6 text-sm" onClick={onConfirm} text="Checkout" />
          <TextButton style="bg-gray-500 px-6 rounded-lg" onClick={onClose} text="Cancel" />
        </div>
      </div>
    </div>
  );
};
