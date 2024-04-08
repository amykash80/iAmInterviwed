import { Fragment } from "react";
import RegisterCom from "../components/register/RegisterCom";
import RegisterCompany from "../components/register/RegisterCompany";
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

const Register: React.FC = (props) => {
    const requestParams: RegisterParams = useParams();
    return (
        <div className="main-wrapper" >
            <HeaderOuter />
            {(requestParams.type === "Candidate" || requestParams.type === "Interviewer") && (
                <>
                    <RegisterCom />
                </>
            )}
            {requestParams.type === "Company" && (
                <>
                    <RegisterCompany />
                </>
            )}
            <FooterOuter />
        </div>
    );
};
export default Register;