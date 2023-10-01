import { APP_LOGO_URL } from "../Utils/Images";
import { useContext, useEffect, useState } from "react";
import menuBarContext from "../Utils/menuBarContext";
import { SEARCH_SUGGESTIONS_URL } from "../Utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { insertSearchCache } from "../Utils/searchCacheSlice";
import { Link, useNavigate } from "react-router-dom";
import store from "../Utils/Store";
import React from "react";
import AuthorizeUser from "./AuthorizeUser";

const Header = () => {
  const [suggetions, setSuggetions] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedin") || false;
  const [displaySuggetions, setDisplaySuggetions] = useState(true);
  const [typing, setTyping] = useState("");
  const navbarinfo = useContext(menuBarContext);
  const { navbarconfig, setNavBarConfig } = navbarinfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storevalue = useSelector((store) => {
    return store.searchCache;
  });
  // console.log(storevalue);

  const handleKeyPress = (e) => {
    if (e?.code == "Enter" && typing?.length > 0) {
      navigate("/results?searchquery=" + typing);
    }
  };

  async function getSuggetions() {
    // checks in store
    //
    //  if(store) avoide api call else do api call and store.
    //

    if (typing.length === 0) {
      //avoid network hit for searchsuggetions
      setSuggetions([]);
    } else {
      //Network hit for searchsuggetions

      //if typed value present in store avoid api call
      //elso do api call. done
      let searchValueStore = storevalue[typing];
      console.log(searchValueStore);
      if (searchValueStore) {
        setSuggetions(searchValueStore);
      } else {
        const data = await fetch(SEARCH_SUGGESTIONS_URL + typing);
        const jsondata = await data.json();
        setSuggetions(jsondata?.[1]);
        let searchcache = {
          [typing]: jsondata?.[1],
        };
        dispatch(insertSearchCache(searchcache));
      }
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      getSuggetions();
    }, 200);
    return () => {
      clearTimeout(timerId);
    };
  }, [typing]);
  return (
    <React.Fragment>
      <div className="m-[0.4rem] flex sticky top-0 items-center bg-white z-[1000]">
        <div
          className="cursor-pointer hover:bg-[#e5e5e5] hover:rounded-[50%] w-[40px] h-[40px] pt-[6px]"
          onClick={() => {
            setNavBarConfig(!navbarconfig);
          }}
        >
          <div className=" border-b-black border-l-0 border-r-0 border-t-0 border w-4 border-solid p-0.5 pt-[7px] m-auto"></div>
          <div className=" border-b-black border-l-0 border-r-0 border-t-0 border w-4 border-solid p-0.5 m-auto"></div>
          <div className=" border-b-black border-l-0 border-r-0 border-t-0 border w-4 border-solid p-0.5 m-auto"></div>
        </div>
        <div>
          <img
            className=" w-[100px] h-[50px]"
            src={APP_LOGO_URL}
            alt="youtube-logo"
          />
        </div>
        <div>
          <input
            className="border border-solid border-gray-300 p-1 rounded-l-full w-[550px] ml-[12.5rem] pl-3 focus-visible:outline-none"
            type="search"
            onBlur={() => {
              setTimeout(() => {
                setDisplaySuggetions(false);
              }, 500);
            }}
            onKeyDown={handleKeyPress}
            onChange={(e) => {
              setTyping(e.target.value);
              setDisplaySuggetions(true);
            }}
          />
          <button
            className="border border-solid border-gray-300 border-l-0 p-1 pl-[1.5rem] pr-[1.5rem] rounded-r-full"
            onClick={() => {
              navigate("/results?searchquery=" + typing);
            }}
          >
            🔍
          </button>
          {suggetions.length > 0 && displaySuggetions && (
            <div className="bg-white border border-solid absolute w-[550px]  ml-[12.5rem] rounded-md z-[2]">
              <ul>
                {suggetions.map((eachsuggetion) => {
                  return (
                    <Link to={"/results?searchquery=" + eachsuggetion}>
                      <li
                        className=" pl-[10px] pb-[5px] hover:bg-gray-200 cursor-pointer "
                        key={eachsuggetion}
                      >
                        {eachsuggetion}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {!isLoggedIn && (
          <div className="absolute z-50 right-[18px] top-[8px]">
            <AuthorizeUser></AuthorizeUser>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Header;
