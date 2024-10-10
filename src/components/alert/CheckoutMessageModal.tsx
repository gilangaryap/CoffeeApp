import { PrimaryButton } from "../button/PrimaryButton";

interface CheckoutModalProps {
  textHeader: string;
  textBody: string;
  isOpen: boolean;
  onConfirm: () => void;
}

export const CheckoutMessageModal = ({
  textHeader,
  textBody,
  isOpen,
  onConfirm
}: CheckoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={` fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}>
      <div className="modal-content bg-white p-6 rounded shadow-lg max-w-md uw:max-w-2xl w-3/4 tbt:w-full text-center">
        <h2 className="text-sm tbt:text-2xl uw:text-4xl font-semibold mb-4">
          {textHeader}
        </h2>
        <p className="text-xs xsm:text-sm tbt:text-base uw:text-2xl mb-6">
          {textBody}
        </p>
        <PrimaryButton
            style="w-full text-sm"
            onClick={onConfirm}
            text="Checkout"
          />
      </div>
    </div>
  );
};

