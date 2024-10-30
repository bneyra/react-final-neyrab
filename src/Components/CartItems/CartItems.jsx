import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import placeholder_image from "../Assets/empty-cart.png";

const CartItems = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, theme } = useContext(ShopContext);

  // Función para calcular el precio total por cada item considerando la cantidad
  const calculateTotalPrice = (item) => {
    return item.new_price * item.quantity;
  };

  // Comprobar si el carrito está vacío
  const isEmptyCart = cartItems.length === 0;

  return (
    <div className="cartitems">
      <div className={`cartitems-format-main ci_${theme}`}>
        <p>Productos</p>
        <p>Títulos</p>
        <p>Precio</p>
        <p>Talle</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      {isEmptyCart && (
        <div className="empty-cart">
          <img
            src={placeholder_image}
            alt="Empty Cart"
            style={{ width: "150px", marginLeft: "490px" }}
          />
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "24px", color: "#333" }}>
              No hay nada en tu carrito
            </p>
            <p style={{ fontSize: "18px", color: "#999" }}>
              ¿Agregamos algún producto?
            </p>
          </div>
        </div>
      )}
      <hr />
      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <div
              className={`cartitems-format cartitems-format-main ci_${theme}`}
            >
              <img
                src={item.image}
                alt=""
                className="carticon-product-icon"
                style={{ width: "50px", margin: "auto" }}
              />
              <p>{item.name}</p>
              <p className="text-Align">${item.new_price}</p>
              <p className="text-Align">{item.size}</p>
              <p className="cartitems-quantity">{item.quantity}</p>
              <p className="text-Align">${calculateTotalPrice(item)}</p>
              {/* Mostrar precio total por cada artículo */}
              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => removeFromCart(item.id)}
                alt="Eliminar producto del carrito"
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className={`cartitems-total ci_${theme}`}>
          <h1>Productos Totales</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Envío</p>
              <p>GRATIS</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEDE AL CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>Si tienes un código promocional, ingrésalo aquí</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Ingresa el código" />
            <button>ENVIAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
