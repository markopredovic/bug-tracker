import React from "react";

const Copyright = () => {
  const currentYear = new Date();
  return (
    <div className="d-flex justify-content-center py-3">
      <span className="mr-1">Copyright &copy; {currentYear.getFullYear()}</span>
    </div>
  );
};

export default Copyright;
