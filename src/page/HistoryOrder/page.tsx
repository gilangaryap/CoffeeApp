import { MessageCard } from "../../components/card/MessageCard"
import { OrderList } from "./view/OrderList"

export const HistoryOrder = () => {
  return (
    <div className="pt-10 lg:pt-16">
        <p className="text-header  text-wrap text-heading_mobile lg:text-heading_desktop font-medium  ">
        History Order
        </p>
        <OrderList/>
        <MessageCard/>
    </div>
  )
}
