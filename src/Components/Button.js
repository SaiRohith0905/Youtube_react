import React from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const navigate = useNavigate();
  const { name } = props;
  return (
    <button
      onClick={() => {
        navigate("/results?searchquery=" + name);
      }}
      className="p-2 border border-solid rounded-md m-1 hover:cursor-pointer bg-gray-100"
    >
      {name}
    </button>
  );
};

export default Button;
