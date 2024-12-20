import React from "react";
const NotFound: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight: "85vh"}}>
      <div>
        <h3 className="">Oops the page you were looking for does not exist</h3>
        <p className="">
          You may have mistyped the address or the page may have moved
        </p>
      </div>
    </div>
  );
};

export default NotFound;
