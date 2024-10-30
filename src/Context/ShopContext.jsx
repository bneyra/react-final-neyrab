import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";
import { db } from "../Firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setcartItems] = useState([]);
  const [theme, setTheme] = useState("dark");

  const addToCart = async (itemId, size, quantity) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.id === itemId && item.size === size
    );

    const itemRef = doc(db, "items", itemId);
    const itemDoc = await getDoc(itemRef);

    if (itemDoc.exists()) {
      const itemData = itemDoc.data();
      const availableStock = itemData.stock;

      if (availableStock >= quantity) {
        // Actualizar stock en Firebase
        await updateDoc(itemRef, {
          stock: availableStock - quantity,
        });

        // Actualizar el carrito
        if (existingCartItemIndex !== -1) {
          const updatedCartItems = cartItems.map((item, index) => {
            if (index === existingCartItemIndex) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }
            return item;
          });
          setcartItems(updatedCartItems);
        } else {
          const cartProduct = all_product.find((product) => product.id === itemId);
          cartProduct.size = size;
          cartProduct.quantity = quantity;
          setcartItems([...cartItems, cartProduct]);
        }
      } else {
        alert("Stock insuficiente para agregar este producto al carrito.");
      }
    } else {
      console.error("El producto no existe en Firebase.");
    }
  };

  const removeFromCart = async (itemId, quantity) => {
    const itemRef = doc(db, "items", itemId);
    const itemDoc = await getDoc(itemRef);

    if (itemDoc.exists()) {
      const itemData = itemDoc.data();

      // Actualizar el stock en Firebase al eliminar del carrito
      await updateDoc(itemRef, {
        stock: itemData.stock + quantity,
      });

      // Filtrar los productos eliminados del carrito
      setcartItems(cartItems.filter((product) => product.id !== itemId));
    } else {
      console.error("El producto no existe en Firebase.");
    }
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce(
      (total, product) => total + product.new_price * product.quantity,
      0
    );
  };

  const getTotalCartItems = () => {
    return cartItems.length;
  };

  const contextValue = {
    all_product,
    cartItems,
    theme,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    setTheme,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
