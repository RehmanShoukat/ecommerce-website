// src/pages/Success.jsx
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Your order was placed successfully!"
      subTitle="Thank you for shopping with us. A confirmation email has been sent."
      extra={[
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go to Home
        </button>,
      ]}
    />
  );
};

export default Success;
