import React, { useContext } from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { theme } = useContext(ShopContext);
  return (
    <div className={"hero_" + theme}>
      <div className="hero-left">
        <h2 className={"h2h_" + theme}>NUEVOS ARRIBOS, RECOMENDADOS POR NACHO</h2>
        <div>
          <div className="hero-hand-icon">
            <p className={"ph_" + theme}>LO MEJOR</p>
            <img src={hand_icon} alt="" />
          </div>
          <p className={"ph_" + theme}>ESTA</p>
          <p className={"ph_" + theme}>LLEGANDO</p>
        </div>
        <Link className="link" to={"/collections"}>
          <div className="hero-latest-btn">
            <div className={"div_" + theme}>Ver más</div>
            <img src={arrow_icon} alt="" />
          </div>
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
