import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="pb-4" style={{ minHeight: "90vH" }}>
      <div className="container py-4">{children}</div>
    </main>
  );
};

export default Layout;
