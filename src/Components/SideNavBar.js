import { useContext } from "react";
import { Link } from "react-router-dom";
import menuBarContext from "../Utils/menuBarContext";
import PlayListMenu from "./PlayListMenu";
import floatMenuBarContext from "../Utils/floatMenuBarContext";
const SideNavBar = () => {
  const navbarinfo = useContext(menuBarContext);
  const { navbarconfig, setNavBarConfig } = navbarinfo;
  const { floatNavBarConfig } = useContext(floatMenuBarContext);
  // this for user open float menu and didnt clicked anything and closed the hamburger menu
  // if (!navbarconfig) {
  //   document.getElementsByTagName("body")[0].classList.remove("hideBodyScroll");
  // }
  // // this for float menu
  // if (floatNavBarConfig) {
  //   document.getElementsByTagName("body")[0].classList.add("hideBodyScroll");
  // } else {
  //   document.getElementsByTagName("body")[0].classList.remove("hideBodyScroll");
  // }

  if (navbarconfig && floatNavBarConfig) {
    document.getElementsByTagName("body")[0].classList.add("hideBodyScroll");
  }
  if (!navbarconfig && floatNavBarConfig) {
    document.getElementsByTagName("body")[0].classList.remove("hideBodyScroll");
  }
  return (
    navbarconfig && (
      <div
        className={
          floatNavBarConfig
            ? "absolute bg-white z-20 w-[12%] pl-[20px] overflow-y-auto "
            : "w-[12%] fixed bg-white z-20 pl-[20px]"
        }
      >
        <ul className="border-b-2 border-b-gray-200 ">
          <Link to="/">
            <li className="pt-2 pb-2 pl-2 font-medium text-lg hover:bg-gray-200 hover:rounded-md">
              <i class="fa-solid fa-house"></i> <span> Home</span>
            </li>
          </Link>
          <li className="pt-2 pb-2 pl-2 font-medium text-lg hover:bg-gray-200 hover:rounded-md">
            <i class="fa-solid fa-film"></i>
            <span> Shorts</span>
          </li>
          <Link to="/subscriptions">
            <li className="pt-2 pb-2 pl-2 font-medium text-lg hover:bg-gray-200 hover:rounded-md">
              <i class="fa-regular fa-rectangle-list"></i>
              <span> Subscriptions</span>
            </li>
          </Link>
        </ul>
        <ul>
          <li className="pt-2 font-medium text-xl">
            <PlayListMenu />
          </li>

          <li className="pt-2 pb-2 pl-2 font-medium text-lg hover:bg-gray-200 hover:rounded-md">
            <i class="fa-regular fa-circle-play"></i>
            <span> Library</span>
          </li>
          <Link to="/history">
            <li className="pt-2 pb-2 pl-2 font-medium text-lg hover:bg-gray-200 hover:rounded-md">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span> History</span>
            </li>
          </Link>
          <Link to="/watchlater">
            <li className="pt-2 pb-2 pl-2 font-medium text-lg hover:bg-gray-200 hover:rounded-md">
              <i class="fa-solid fa-clock"></i>
              <span> Watch Later</span>
            </li>
          </Link>
          <li className="pt-4">
            <p>Developed by Sai Rohith Tanguturi.</p>
            <div>
              Contact Us
              <span className="pl-2">
                <Link
                  to="https://www.linkedin.com/in/sairohith-tanguturi-701b2625b/"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin fa-xl cursor-pointer"></i>
                </Link>
              </span>
            </div>

            <p>© 2023 Sai Rohith</p>
          </li>
        </ul>
      </div>
    )
  );
};

export default SideNavBar;
