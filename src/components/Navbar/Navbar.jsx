import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import cl from "./Navbar.module.css";

const Navbar = () => {
  const [openBurger, setOpenBurger] = useState(false);

  const openNav = () => {
    setOpenBurger(!openBurger);
  };
  return (
    <div className={cl.menu__bg}>
      <div className={cl.menu}>
        <div className={cl.menu__links}>
          <Link className={cl.menu__link} to="/home">
            Home
          </Link>
          <Link className={cl.menu__link} to="/completed">
            Completed tasks
          </Link>
        </div>
        <div onClick={openNav} className={cl.burger__wrapper}>
          <span className={cl.bar}></span>
          <span className={cl.bar}></span>
          <span className={cl.bar}></span>
          {openBurger ? (
            <div className={cl.burger__links}>
              <Link className={cl.menu__link} to="/home">
                Home
              </Link>
              <Link className={cl.menu__link} to="/completed">
                Completed tasks
              </Link>
            </div>
          ) : null}
        </div>

        <div className={cl.auth__links}></div>
      </div>
    </div>
  );
};

export default Navbar;
