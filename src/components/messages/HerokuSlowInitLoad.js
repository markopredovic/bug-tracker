import React from "react";
import { Alert } from "react-bootstrap";
import { FaSmileWink } from "react-icons/fa";

const HerokuSlowInitLoad = () => {
  return (
    <div>
      <Alert variant="info">
        <span className="mr-2">
          Wait for initial slow loading from free Heroku server
        </span>
        <FaSmileWink style={{ fontSize: "18px", color: "#F39C12" }} />
      </Alert>
    </div>
  );
};

export default HerokuSlowInitLoad;
