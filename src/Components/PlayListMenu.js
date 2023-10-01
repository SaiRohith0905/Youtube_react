import React from "react";
import AuthorizeUser from "./AuthorizeUser";
import { useSelector } from "react-redux";
import PlayList from "./PlayList";
const PlayListMenu = () => {
  const isLogged = localStorage.getItem("isLoggedin");
  const reactLogin = useSelector((store) => {
    return store.token.tokenValue;
  });
  if (isLogged || reactLogin) {
    return (
      <div>
        <span>
          <PlayList />
        </span>
      </div>
    );
  } else {
    return (
      <div className=" border-b-2 border-b-gray-200 pb-[12px]">
        <div className="text-sm pb-[12px]">
          Sign in to view your Playlists and Subscriptions
        </div>
        <AuthorizeUser />
      </div>
    );
  }
};

export default PlayListMenu;
