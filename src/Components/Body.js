import React from "react";
import SideNavBar from "./SideNavBar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex">
      <SideNavBar />
      {/* <MainContainer /> */}
      <div className="w-[88%]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Body;
