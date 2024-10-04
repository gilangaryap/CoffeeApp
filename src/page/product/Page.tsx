import { ImageProduct } from "./view/ImageProduct"
import { ProductFilter } from "./view/ProductFilter"
import { PromoProduct } from "./view/PromoProduct"

export const Product = () => {
  return (
    <div>
      <ImageProduct/>
      <PromoProduct/>
      <ProductFilter/>
    </div>
  )
}
