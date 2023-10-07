import React, { useState, useEffect } from "react";
import ChannelCard from "./ChannelCard";
import AuthorizeUser from "./AuthorizeUser";
import { GET_MY_SUBSCRIPTIONS_URL, YOUTUBE_KEY } from "../Utils/Constant";
import Toasting from "./CustomHooks/Toasting";

const SubscriptionsPage = () => {
  const authtoken = localStorage.getItem("authtoken");
  const isLoggedIn = localStorage.getItem("isLoggedin") || false;
  const [mySubscriptions, setMySubscriptions] = useState([]);
  async function getMySubscriptions() {
    const url = GET_MY_SUBSCRIPTIONS_URL + YOUTUBE_KEY;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authtoken,
        Accept: "application / json",
      },
    });
    const jsonOutput = await response.json();
    console.log(jsonOutput);
    setMySubscriptions(jsonOutput?.items);
  }
  useEffect(() => {
    getMySubscriptions();
  }, []);
  if (isLoggedIn) {
    return mySubscriptions.map((eachitem) => {
      return <ChannelCard channeldetails={eachitem} />;
    });
  } else {
    return (
      <div className="mt-[150px] text-center pb-[12px]">
        <div className="text-5xl m-16">
          Hello User <i className="fa-regular fa-face-laugh-beam fa-2xl"></i>{" "}
          !!!
        </div>
        <div className="text-5xl m-16">Sign in to view your Subscriptions</div>
        <AuthorizeUser issubpage={true} />
      </div>
    );
  }
};

export default SubscriptionsPage;
