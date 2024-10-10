import { Link } from "react-router-dom";

interface OrderItemProps {
  uuid: string;
  img_product: string;
  order_number: string;
  created_date: string;
  product_price: string;
  status: string;
}

export const OrderItemCard = ({ uuid, img_product, order_number, created_date, product_price, status,}: OrderItemProps) => {
  return (
    <div className="grid grid-cols-[1fr,1fr] md:grid-cols-[auto,1fr,1fr,1fr,1fr] gap-5 p-3 items-start border">
      <div className="w-full h-full grid items-center">
        <img
          className="w-full h-full md:w-[100px] md:h-[100px]"
          src={img_product}
          alt="Product"
        />
      </div>
      <div className="px-2 grid md:justify-center">
        <div className="text-lg text-gray-400 grid grid-cols-[auto,1fr] gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <p>No Order</p>
        </div>
        <div>
          <p className="font-bold text-base text-[#0B132A]">{order_number}</p>
          <Link
            to={`/order/${uuid}`}
            className="underline hidden md:block lg:hidden text-oren text-base text-primary">
            View Order
          </Link>
          <Link
            to={`/order/${uuid}`}
            className="whitespace-nowrap underline block md:hidden lg:block text-oren text-base text-primary">
            View Order Details
          </Link>
        </div>
      </div>

      <div className="grid md:justify-center">
        <div className="text-lg text-gray-400 grid grid-cols-[auto,1fr] gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          <p>Date</p>
        </div>
        <h1 className="font-bold text-base text-[#0B132A]">{created_date}</h1>
      </div>

      <div className="grid md:justify-center">
        <div className="text-lg text-gray-400 grid grid-cols-[auto,1fr] gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <p>Total</p>
        </div>
        <div className="font-bold text-base text-[#0B132A]">
          IDR {product_price}
        </div>
      </div>

      <div className="grid md:justify-center">
        <div className="text-lg text-gray-400 grid grid-cols-[auto,1fr] gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
            />
          </svg>
          <p>Status</p>
        </div>
        <div className="font-semibold text-primary bg-[#FF890633] rounded-3xl text-base px-3 py-1 text-center">
          {status}
        </div>
      </div>
    </div>
  );
};
