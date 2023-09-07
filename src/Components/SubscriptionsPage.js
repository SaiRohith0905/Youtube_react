import React, { useState, useEffect } from "react";
import ChannelCard from "./ChannelCard";
import { GET_MY_SUBSCRIPTIONS_URL, YOUTUBE_KEY } from "../Utils/Constant";

const SubscriptionsPage = () => {
  const authtoken = localStorage.getItem("authtoken");
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
  if (mySubscriptions?.length > 0) {
    return mySubscriptions.map((eachitem) => {
      return <ChannelCard channeldetails={eachitem} />;
    });
  }
};

export default SubscriptionsPage;
