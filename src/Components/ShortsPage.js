import React from "react";
import { useParams } from "react-router-dom";
import Short from "./Short";

const ShortsPage = () => {
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
  const data = useParams();
  console.log(data);
  return (
    <div>
      <Short shortsdata={data.id} />
      {/* {shortsMockData.map((eachshort) => {
        return <Short shortsdata={data.id} />;
      })} */}
    </div>
  );
};

export default ShortsPage;
