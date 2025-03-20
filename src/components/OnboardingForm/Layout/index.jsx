import React from "react";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <h1></h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
