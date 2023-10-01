import React, { useState, useEffect } from "react";
import { PLAYLIST_URL } from "../Utils/Constant";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlayListItems } from "../Utils/PlayListItemsSlice";

const PlayList = () => {
  const [playListItems, setPlayListItems] = useState([]);
  const token = localStorage.getItem("authtoken");
  const dispatch = useDispatch();
  async function getPlayList() {
    const response = await fetch(PLAYLIST_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const jsondata = await response?.json();
    setPlayListItems(jsondata?.items);
    dispatch(addPlayListItems(jsondata?.items));
  }

  useEffect(() => {
    getPlayList();
  }, []);
  if (playListItems?.length > 0) {
    return (
      <ul>
        {playListItems.map((eachPlayListItem) => {
          return (
            <Link to={"/playlist?list=" + eachPlayListItem?.id}>
              <div className=" hover:bg-gray-200 hover:rounded-md ">
                <i class="fa-solid fa-headphones-simple pr-[4px] ml-2"></i>

                <li className=" mt-1 mb-1 pt-1 pb-1 inline-block">
                  {eachPlayListItem?.snippet?.title}
                </li>
              </div>
            </Link>
          );
        })}
      </ul>
    );
  }
};

export default PlayList;
