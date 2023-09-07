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
        <PlayList />
      </div>
    );
  } else {
    return (
      <div>
        <div>Sign in to view your Playlists and Subscriptions</div>
        <AuthorizeUser />
      </div>
    );
  }
};

export default PlayListMenu;
