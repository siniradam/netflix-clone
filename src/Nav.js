import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleShow(window.scrollY > 100);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        alt='Logo'
        className='nav__logo'
      />
      <img
        src='https://picsum.photos/200'
        alt='avatar'
        className='nav__avatar'
      />
    </div>
  );
}

export default Nav;
