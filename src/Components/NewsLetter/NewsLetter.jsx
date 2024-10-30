import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validate = () => {
    const approvedDomains = [".com", ".in", ".org", ".net", ".edu"];
    const regex = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/;

    if (regex.test(email)) {
      const domain = email.split("@")[1];
      const isValidDomain = approvedDomains.some((approvedDomain) =>
        domain.endsWith(approvedDomain)
      );

      if (isValidDomain) {
        setMessage("¡Te has suscrito con exito a PatronShop!");
      } else if(!isValidDomain){
        setMessage(
          "Por favor ingrese un correo electrónico válido con un dominio aprobado"
        );
      }
      else {
        setMessage("");
      }
    } else if(!regex.test(email) && email != "") {
      setMessage("Porfavor, ingrese una dirección válida");
    }
    else{
      setMessage("");
    }
  };

  // const handleSubscribe = () => {
  //   const isValid = validate();
  //   if (isValid) {
  //     console.log(" exitosa!");
  //     setEmail(""); // Borrar correo electrónico después de una suscripción exitosa
  //   }
  // };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="newsletter">
      <h1>Obtenga ofertas exclusivas en su correo electrónico</h1>
      <p>Suscríbase a PATRONSHOP y manténgase actualizado</p>
      <div>
        <input
          type="email"
          placeholder="Escribe aqui tu Email"
          value={email}
          onChange={handleOnChange}
        />
        <button onClick={validate}>Subscribirte</button>
        
      </div>
      {message && (
          <p
            className="msg"
            style={{ color: message.includes("Subscribed") ? "green" : "red" }}
          >
            {message}
          </p>
        )}
    </div>
  );
};

export default NewsLetter;
