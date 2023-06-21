import React from "react";
import "./footer.css";
import { Pagination } from "antd";
import "./footer.css";

const Footer = ({ getMovieRequest, searchValue, pageAdd }) => {
  return (
    <div className="footer-container">
      <Pagination
        total={10}
        pageSize={1}
        onChange={(page) => {
          pageAdd(page);
          getMovieRequest(searchValue);
        }}
      />
    </div>
  );
};

export default Footer;
