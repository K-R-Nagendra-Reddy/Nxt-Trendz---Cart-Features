// Write your code here
import cartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <cartContext.Consumer>
    {value => {
      const {cartList} = value
      const count = cartList.length
      const total = cartList.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0,
      )
      console.log(total)
      return (
        <div>
          <h1>Order Total: Rs {total}/- </h1>
          <p>{count} items in cart.</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </cartContext.Consumer>
)
export default CartSummary
