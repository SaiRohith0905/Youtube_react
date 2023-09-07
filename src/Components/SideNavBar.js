import { useContext } from "react";
import { Link } from "react-router-dom";
import menuBarContext from "../Utils/menuBarContext";
import PlayListMenu from "./PlayListMenu";
const SideNavBar = () => {
  const navbarinfo = useContext(menuBarContext);
  const { navbarconfig, setNavBarConfig } = navbarinfo;
  return (
    navbarconfig && (
      <div className=" w-[12%] ml-[20px]">
        <ul className="border-b-2 border-b-gray-200 ">
          <Link to="/">
            <li className="pt-2 pb-2 font-medium  hover:bg-gray-200 hover:rounded-md">
              Home
            </li>
          </Link>
          <li className="pt-2 pb-2 font-medium  hover:bg-gray-200 hover:rounded-md">
            Shorts
          </li>
          <Link to="/subscriptions">
            <li className="pt-2 pb-2 font-medium  hover:bg-gray-200 hover:rounded-md">
              Subscriptions
            </li>
          </Link>
        </ul>
        <ul>
          <li className="pt-2 font-medium ">
            <PlayListMenu />
          </li>

          <li className="pt-2 pb-2 font-medium  hover:bg-gray-200 hover:rounded-md">
            Library
          </li>
          <Link to="/history">
            <li className="pt-2 pb-2 font-medium  hover:bg-gray-200 hover:rounded-md">
              History
            </li>
          </Link>
          <li className="pt-2 pb-2 font-medium  hover:bg-gray-200 hover:rounded-md">
            Watch Later
          </li>
        </ul>
      </div>
    )
  );
};

export default SideNavBar;
