import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";

export default function User() {
  return (
    <div className="container-fluid h-full w-full">
      <Header/>
      <Outlet />
    </div>
  );
}
