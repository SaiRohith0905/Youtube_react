import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ShortsLoop = () => {
  const navigate = useNavigate;
  const shortsMockData = [
    "CL1hUw9axps",
    "BQLybNh4tR8",
    "5lvXwWJU17c",
    "UyXHO2J5aig",
    "zncNtWhBy_M",
    "DCq6JmutBos",
    "j2hjdqkHX4E",
    "ClivakhDibg",
    "KXGwNn0GZxQ",
  ];
  return (
    <div>
      {/* navigate("/shorts/" + "CL1hUw9axps") */}
      {/* {shortsMockData.map((eachshort) => {
        return navigate("/shorts/" + eachshort);
      })} */}
    </div>
  );
};

export default ShortsLoop;
