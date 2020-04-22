import React from "react";
import { Alert } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const HerokuSlowInitLoad = () => {
  return (
    <div>
      <Alert variant="info" className="d-flex align-items-center">
        <span className="mr-4">
          Please wait for initial slow loading from Heroku free account server
        </span>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Alert>
    </div>
  );
};

export default HerokuSlowInitLoad;
