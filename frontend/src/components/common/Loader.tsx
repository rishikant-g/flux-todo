import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", position : "absolute", top: '0', right: '0', bottom: '0', width: "100%", background: "rgba(255,255,255,1)", zIndex: '999' }}
    >
      <SmallLoader/>
    </div>
  );
};

export const SmallLoader = () => {
  return <>
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>
  </>
}

export default Loader;
