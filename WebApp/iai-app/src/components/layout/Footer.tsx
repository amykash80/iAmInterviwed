import React from "react";

const Footer = () => {
  let releaseYear = new Date().getFullYear();
  return (
    <React.Fragment>
      <div className="page-footer">
        <p>Copyright &copy; <span className="current-year"></span> {releaseYear} Iam Interviewed All rights reserved.</p>
      </div>
    </React.Fragment>
  );
};
export default Footer; 