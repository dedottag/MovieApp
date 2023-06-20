import React from "react";
import "./footer.css";
import { Pagination } from "antd";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <Pagination total={20} pageSize={6} />
    </div>
  );
};

export default Footer;
