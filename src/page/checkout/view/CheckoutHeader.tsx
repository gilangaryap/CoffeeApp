interface CheckoutHeaderProps {
  onAddMenuClick: () => void;
}

export const CheckoutHeader = ({onAddMenuClick}:CheckoutHeaderProps) => {
  return (
    <section className="pt-10 lg:pt-20 justify-between grid grid-cols-1 grid-rows-2 gap-10 ">
      <p className="text-header text-wrap text-heading_mobile lg:text-heading_desktop font-medium">
        Payment Details
      </p>
      <div className="flex flex-row justify-between">
        <p className="text-xl font-medium">Your Order</p>
        <button
          onClick={onAddMenuClick}
          className="px-4 py-2 rounded-lg bg-primary font-normal"
        >
          + Add Menu
        </button>
      </div>
    </section>
  );
};