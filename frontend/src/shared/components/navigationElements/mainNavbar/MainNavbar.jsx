import React, { Fragment, useState } from "react";

import MainHeader from "../mainHeader/MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "../navLinks/NavLinks";
import SideDrawer from "../sideDrawer/SideDrawer";

import "./MainNavbar.css";
import Backdrop from "../../UIElements/backdrop/BackDrop";

const MainNavbar = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = (props) => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = (props) => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavbar;
