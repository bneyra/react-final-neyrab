import React, { useContext } from 'react';
import './CSS/Contact.css'
import { ShopContext } from '../Context/ShopContext';

const Contact = () => {
  const {theme}=useContext(ShopContext);
  return (
    <div className={"container-my_"+theme}>
      <h1 id="myheading">
        Contact Us
      </h1>
      <p>
      Esta es la página oficial de PatronShop, donde podrás compartir todas tus consultas, comentarios, quejas o cualquier inquietud que tengas sobre nuestros productos.
      </p>
      <p>
      En caso de cualquier queja, no dude en ponerse en contacto con nosotros a nuestro número de contacto oficial xxxxxxxxxx. O puede escribirnos a xyz@gmail.com.      </p>
      </div>
  );
};

export default Contact;