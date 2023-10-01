import React, { useContext } from "react";
import SideNavBar from "./SideNavBar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";
import menuBarContext from "../Utils/menuBarContext";
import { ToastContainer } from "react-toastify";
import floatMenuBarContext from "../Utils/floatMenuBarContext";

const Body = () => {
  const { floatNavBarConfig } = useContext(floatMenuBarContext);
  const { navbarconfig } = useContext(menuBarContext);
  function generateConditionalStyling() {
    // temporary fix need to =write a good solution @ sairohith reddy .
    if (floatNavBarConfig) {
      return "w-[88%] relative left-[2%]";
    }
    if (navbarconfig) {
      return navbarconfig
        ? "w-[88%] relative left-[12%]"
        : "w-[88%] relative left-[2%]";
    }
  }

  return (
    <div className="flex">
      <SideNavBar />

      {/* <MainContainer /> */}
      <div className={generateConditionalStyling()}>
        <Outlet></Outlet>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Body;
