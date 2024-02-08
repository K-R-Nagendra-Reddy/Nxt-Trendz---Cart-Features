import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const isAlreadyPresent = cartList.find(
      eachObject => eachObject.id === product.id,
    )

    if (isAlreadyPresent) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachOne => {
          if (eachOne.id === product.id) {
            return {...eachOne, quantity: eachOne.quantity + product.quantity}
          }
          return eachOne
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: eachProduct.quantity + 1}
        }
        return eachProduct
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const wantedObject = cartList.find(eachOne => eachOne.id === id)
    if (wantedObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObject => {
          if (eachObject.id === id) {
            return {...eachObject, quantity: eachObject.quantity - 1}
          }
          return eachObject
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachOne => eachOne.id !== id),
    }))
  }

  removeCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
