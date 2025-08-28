import React, { createContext, useContext, useEffect, useState } from 'react'

const Cart = createContext()

const CartContext = ({ children }) => {

    const cartArray = JSON.parse(localStorage.getItem("items")) || []

    const [cart, setCart] = useState([])

    useEffect(() => {
        setCart(cartArray)
    }, [])

    

    const addToCart = (item) => {
        setCart((prev) => [...prev, item]);
        localStorage.setItem('items', JSON.stringify([...cart, item]))
    };

    const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('items' ,JSON.stringify(updatedCart));
  };

    const clearCart = () => setCart([]);

    return (
        <Cart.Provider value={{ cart, setCart, addToCart,removeFromCart ,clearCart }}>
            {children}
        </Cart.Provider>
    )
}

export const useCartContext = () => useContext(Cart)

export default CartContext