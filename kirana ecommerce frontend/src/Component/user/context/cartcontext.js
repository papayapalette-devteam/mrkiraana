import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // example structure
  const removeFromCart=(id)=>
  {
    setCartItems(cartItems.filter((item)=>(item._id !==id)))
  }

    const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? { ...item, product_quantity: newQuantity }
          : item
      )
    );
  };
  return (
    <CartContext.Provider value={{ cartItems, setCartItems,removeFromCart,updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
