import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDRsfaaxTaGWszDEN0QCpvxpAbCwDkZLJI",
  authDomain: "patronshop-a7d0f.firebaseapp.com",
  projectId: "patronshop-a7d0f",
  storageBucket: "patronshop-a7d0f.appspot.com",
  messagingSenderId: "40355719228",
  appId: "1:40355719228:web:7e568e8e7248f4d0ae7b39",
  measurementId: "G-133LZ0QQLX"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const GlobalContext = createContext([]);

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [orderId, setOrderId] = useState(null);

  // Función para obtener productos desde Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemCollection = collection(db, "items");
        const snapshot = await getDocs(itemCollection);
        const itemDB = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(itemDB);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const fetchOrderById = async orderId => {
    try {
      const orderRef = doc(db, "ordenes", orderId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        return orderSnap.data();
      } else {
        throw new Error("No se encontró la orden");
      }
    } catch (error) {
      console.error("Error fetching order: ", error);
      throw error;
    }
  };

  const addToCart = (item, cantidadSeleccionada = 1) => {
    const itemExist = carrito.findIndex(prod => prod.id === item.id);
    if (itemExist >= 0) {
      const updatedCart = [...carrito];
      updatedCart[itemExist].cantidad += cantidadSeleccionada;
      setCarrito(updatedCart);
    } else {
      item.cantidad = cantidadSeleccionada;
      setCarrito([...carrito, item]);
    }
  };

  const removeFromCart = id => {
    setCarrito(prevCart => prevCart.filter(prod => prod.id !== id));
  };

  const clearCart = () => setCarrito([]);

  const totalItemsInCart = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const createOrder = async buyer => {
    const items = carrito.map(item => ({
      id: item.id,
      price: item.precio,
      title: item.nombre
    }));

    const order = {
      buyer,
      items,
      total: totalPrice,
      date: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "ordenes"), order);
      setOrderId(docRef.id);
      clearCart();
      console.log("Orden creada con ID: ", docRef.id);
    } catch (error) {
      console.error("Error al crear la orden: ", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        data,
        loading,
        carrito,
        setCarrito,
        addToCart,
        removeFromCart,
        clearCart,
        totalItemsInCart,
        totalPrice,
        createOrder,
        fetchOrderById,
        orderId
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Exportar db 
export { db };  
export default GlobalContext;
