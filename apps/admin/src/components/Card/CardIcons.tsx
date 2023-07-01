import ClientIconDashBoard from "@icons/clients-dashboard.svg"
import CartIconDashBoard from "@icons/cart-dashboard.svg"
import ProductIconDashBoard from "@icons/product-dashboard.svg"
import CashIconDashBoard from "@icons/cash-dashboard.svg"

const CartIcon = () => {
  return (
      <div
        className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
      >
        <CartIconDashBoard />
      </div>
  )
}

const ClientIcon = () => {
  return (
      <div
        className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
      >
        <ClientIconDashBoard />
      </div>
  )
}


const ProductIcon = () => {
  return (
      <div
        className="p-3 mr-4 text-purple-500 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-500"
      >
        <ProductIconDashBoard />
      </div>
  )
}

const CashIcon = () => {
  return (
      <div
        className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
      >
        <CashIconDashBoard />
      </div>
  )
  }

export { CartIcon, ClientIcon, ProductIcon, CashIcon };