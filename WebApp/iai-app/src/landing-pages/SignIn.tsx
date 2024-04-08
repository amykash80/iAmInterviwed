import { Fragment } from "react";
import Login from "../components/signin/Login";
import HeaderOuter from "../components/layout/HeaderOuter";
import FooterOuter from "../components/layout/FooterOuter";
import "../assets/css/plugins.css";
import "../assets/css/rev_slider/settings.css";
import "../assets/css/rev_slider/layers.css";
import "../assets/css/rev_slider/navigation.css";
import "../assets/quform/css/base.css";
import "../assets/search/search.css";
import "../assets/css/styles.css";
import "../assets/css/custom.css";

const SignIn: React.FC = (props) => {
    return (
        <div className="main-wrapper">
            <HeaderOuter />
            <Login />
            <FooterOuter />
        </div>
    );
};
export default SignIn;