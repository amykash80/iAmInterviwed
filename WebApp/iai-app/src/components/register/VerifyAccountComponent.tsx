import { useState } from "react";
import { useParams } from "react-router-dom";
import VerifyAccountParams from "../../models/common/PageParms";
import RegisterService from "../../services/authentication-service";
import alertUtils from "../../utils/toaster-utils";
import VerificationModel from "../../models/authentication/VerificationModel";

const VerifyAccountComponent = () => {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const requestParams: VerifyAccountParams = useParams();

    const verifyAccount = () => {
        var verifyModel: VerificationModel = {
            verificationCode: verificationCode,
            verificationString: requestParams.verificationCode
        };
        RegisterService.VerifyUser(verifyModel).then((res) => {
            if (res.isSuccess) {
                alertUtils.showSuccess(res.informationMessages.toString());
            } else {
                alertUtils.showError(res.errorMessages.toString());
            }
        }).catch((error) => {
            alertUtils.showError("Erorr registering user.");
        });
    }

    return (
        <section className="bg-light md">
            <div className="container-body">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="quform-element form-group">
                            <div className="quform-input">
                                <input type="text" className="form-control" placeholder="Verification Code" onChange={e => setVerificationCode(e.target.value)} autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="quform-submit-inner">
                            <button className="butn primary mt-4" type="submit" onClick={() => verifyAccount()}><span>Verify</span></button>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
    );
};
export default VerifyAccountComponent;