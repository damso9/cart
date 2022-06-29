import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import { reducer } from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const defaultState = {
  cart: [],
  isLoading: false,
  cartItemsTotal: 3,
  cartPriceTotal: 0,
};

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems)
  const [state, dispatch] = useReducer(reducer, defaultState);

  const getData = async() => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({type: 'LOAD_DATA', payload: data})
    } catch(err) {
      console.log(err)
    }

  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const removeCartItem = (id) => {
    console.log(id);
    const newCart = state.cart.filter((cartItem) => {
      return cartItem.id !== id;
    });
    console.log(newCart);
    dispatch({ type: "REMOVE_CART_ITEM", payload: newCart });
  };

  const increase = (id) => {
    const newCart = state.cart.map((cartItem) => {
      let newAmount = cartItem.amount;
      if (id === cartItem.id) {
        newAmount = newAmount + 1;
      }
      return {
        ...cartItem,
        amount: newAmount,
      };
    });
    dispatch({ type: "INCREASE", payload: newCart });
  };

  const decrease = (id) => {
    const newCart = state.cart.map((cartItem) => {
      let newAmount = cartItem.amount;
      if (id === cartItem.id) {
        newAmount = newAmount - 1;
      }
      return {
        ...cartItem,
        amount: newAmount,
      };
    });

    const verifyNewCart = newCart.filter((cartItem) => cartItem.amount !== 0);
    dispatch({ type: "DECREASE", payload: verifyNewCart });
  };

  useEffect(() => {
    dispatch({ type: 'LOADING'})
    getData()
  },[])

  useEffect(() => {
    dispatch({ type: "GET_TOTAL"})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        state,
        clearCart,
        removeCartItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
