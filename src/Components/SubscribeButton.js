import React, { useEffect, useState, useRef } from "react";
import {
  IS_SUBSCRIBED_URL,
  SUBSCRIBE_TO_CHANNEL_URL,
  UNSUBSCRIBE_TO_CHANNEL_URL,
} from "../Utils/Constant";
import { YOUTUBE_KEY } from "../Utils/Constant";

const SubscribeButton = (props) => {
  console.log(props);
  const subscriptionId = useRef("");
  const channelId = props?.details;
  const authtoken = localStorage.getItem("authtoken");
  const [subscribed, setSubscribed] = useState(false);
  const [showUnSubscribe, setShowUnSubscribe] = useState(false);

  async function isSubscribed() {
    const url = IS_SUBSCRIBED_URL + channelId + "&mine=true&key=" + YOUTUBE_KEY;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authtoken,
        Accept: "application/json",
      },
    });
    const jsonOutput = await response.json();
    if (jsonOutput?.items?.length > 0) {
      setSubscribed(true);
      subscriptionId.current = jsonOutput.items[0]?.id;
    } else {
      setSubscribed(false);
    }
    console.log(jsonOutput, jsonOutput?.items?.length > 0);
    // setSubscribed(jsonOutput?.items?.length > 0 ? true : false);
  }

  async function subscribeChannel() {
    const subscribePayLoad = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId: channelId,
        },
      },
    };
    const url = SUBSCRIBE_TO_CHANNEL_URL + YOUTUBE_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authtoken,
        Accept: "application / json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscribePayLoad),
    });
    const jsonOutput = await response.json();
    // console.log(jsonOutput);
    subscriptionId.current = jsonOutput?.id;
    console.log(subscriptionId);
    if (jsonOutput?.id) {
      setSubscribed(!subscribed);
    }
  }

  async function unSubscribeChannel() {
    const url =
      UNSUBSCRIBE_TO_CHANNEL_URL +
      subscriptionId.current +
      "&key=" +
      YOUTUBE_KEY;
    const response5 = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authtoken,
        Accept: "application / json",
      },
    });
    setSubscribed(!subscribed);
    setShowUnSubscribe(!showUnSubscribe);
  }
  useEffect(() => {
    channelId && isSubscribed();
  }, []);
  return (
    <>
      {!subscribed && (
        <div
          onClick={() => {
            subscribeChannel();
          }}
        >
          Subscribe
        </div>
      )}
      {subscribed && (
        <div
          onClick={() => {
            setShowUnSubscribe(!showUnSubscribe);
          }}
        >
          Subscribed
        </div>
      )}
      {showUnSubscribe && (
        <div className=" border border-solid border-blue-50 shadow-md bg-white rounded-md w-[200px]">
          <ul className="">
            <li
              className="hover:bg-gray-200 cursor-pointer p-3"
              onClick={() => {
                unSubscribeChannel();
              }}
            >
              UnSubscribe
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SubscribeButton;
