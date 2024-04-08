import { Fragment } from "react";
import VerifyAccountComponent from "../components/register/VerifyAccountComponent";
import HeaderOuter from "../components/layout/HeaderOuter";
import FooterOuter from "../components/layout/FooterOuter";
import { useParams } from "react-router-dom";
import RegisterParams from "../models/common/PageParms";
import "../assets/css/plugins.css";
import "../assets/css/rev_slider/settings.css";
import "../assets/css/rev_slider/layers.css";
import "../assets/css/rev_slider/navigation.css";
import "../assets/quform/css/base.css";
import "../assets/search/search.css";
import "../assets/css/styles.css";
import "../assets/css/custom.css";

const VerifyAccount: React.FC = (props) => {
    const requestParams: RegisterParams = useParams();
    return (
        <div className="main-wrapper" >
            <HeaderOuter />
            <>
                <VerifyAccountComponent />
            </>
            <FooterOuter />
        </div>
    );
};
export default VerifyAccount;