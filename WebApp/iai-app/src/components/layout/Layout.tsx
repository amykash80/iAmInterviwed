import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import SideBar from "./SideBar";
import styles from "./SideBar.module.css";
import Footer from "./Footer";
import "../../assets/InnerCSS/plugins/bootstrap/css/bootstrap.min.css";
import "../../assets/InnerCSS/plugins/font-awesome/css/font-awesome.min.css";
import "../../assets/InnerCSS/plugins/icomoon/style.css";
import "../../assets/InnerCSS/plugins/uniform/css/default.css";
import "../../assets/InnerCSS/plugins/switchery/switchery.min.css";
import "../../assets/InnerCSS/plugins/nvd3/nv.d3.min.css";
import "../../assets/InnerCSS/css/styles.css";
import "../../assets/InnerCSS/css/custom.css";

interface Props {
  children: object;
}

let bodyRowClass = `row ${styles.bodyRow}`;

const Layout = (props: Props) => {
  return (
    <div className="page-container">
      <React.Fragment>
        <SideBar />
        <div className="page-content">
          <Header />
          <div className="page-inner">{props.children}
            <Footer />
          </div>
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    </div>
  );
};

export default Layout;