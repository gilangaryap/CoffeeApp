import { useNavigate } from "react-router-dom";
import { CheckoutHeader } from "./CheckoutHeader";

export const Order = () => {
    
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };

  return (
    <div>
      <CheckoutHeader onAddMenuClick={handleClick} />
    </div>
  );
};
