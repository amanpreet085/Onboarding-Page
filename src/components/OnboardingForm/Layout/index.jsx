import React from "react";
import "./styles.css";

const Layout = (props) => {
  const { children, header } = props;

  return (
    <div className="layout">
      <div className="header">
        <p>{header}</p>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
