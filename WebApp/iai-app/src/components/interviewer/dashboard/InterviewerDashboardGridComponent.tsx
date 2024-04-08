import { useRef, MouseEvent, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../context-store";
import AppConfig from "../../../config";
import RegisterParams from "../../../models/common/PageParms";
import IdNameModel from "../../../models/common/IdNameModel";
import RegisterService from "../../../services/authentication-service";
import RegisterUserModel from "../../../models/authentication/RegisterUser";
import { OBJECT_NAME_RULE, EMAIL_RULE, PASSWORD_RULE, MOBILE_NUMBER_RULE } from "../../../utils/validation-utils";
import { useForm } from "react-hook-form";
import masterDataService from '../../../services/master-data-service';
import EncryptUtil from '../../../utils/encode-utils';
import { RoleEnum } from "../../../models/enums/RoleEnum";
import ReCAPTCHA from "react-google-recaptcha";
import CompanyLogo from "../../assets/img/logos/employer.png";
import InterviewerLogo from "../../assets/img/logos/interviewer.png";
import alertUtils from "../../../utils/toaster-utils";

const InterviewerDashboardGridComponent = () => {
    return (
        <div></div>
    );
};
export default InterviewerDashboardGridComponent;