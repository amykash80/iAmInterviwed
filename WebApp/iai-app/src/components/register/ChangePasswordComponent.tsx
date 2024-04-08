import RegisterService from "../../services/authentication-service";
import ChangePasswordModel from "../../models/authentication/ChangePasswordModel";
import { PASSWORD_RULE } from "../../utils/validation-utils";
import { useForm } from "react-hook-form";
import EncryptUtil from '../../utils/encode-utils';
import alertUtils from "../../utils/toaster-utils";
import { useAppSelector } from "../../context-store";

const ChangePasswordComponent = () => {
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ChangePasswordModel>({
        mode: "onChange",
    });

    const onSubmit = (formData: ChangePasswordModel) => {
        formData.password = EncryptUtil.getEncoded(formData.password);
        formData.newPassword = EncryptUtil.getEncoded(formData.newPassword);
        formData.confirmNewPassword = EncryptUtil.getEncoded(formData.confirmNewPassword);
        if (formData.newPassword != formData.confirmNewPassword) {
            alertUtils.showError("New passwords doesn't match.");
        } else {
            if (loggedInUser != null) {
                formData.userId = loggedInUser.userId;
                RegisterService.ChangePassword(formData).then((res) => {
                    if (res.isSuccess) {
                        alertUtils.showSuccess(res.informationMessages.toString());
                    } else {
                        alertUtils.showError(res.errorMessages.toString());
                    }
                }).catch((error) => {
                    alertUtils.showError("Erorr registering user.");
                });
            }
        }
    }

    return (
        <section className="bg-light md">
            <div className="container-body">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form className="contact quform" onSubmit={handleSubmit(onSubmit)}>
                            <div className="quform-elements">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="quform-element form-group">
                                            <div className="quform-input">
                                                <label className="form-label">Existing Password: <span className="required">*</span></label>
                                                <input type="password" className="form-control" {...register("password")} placeholder="Existing Password" autoComplete="off" />
                                                <span className="error">
                                                    {errors.password && errors.password.message}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="quform-element form-group">
                                            <div className="quform-input">
                                                <label className="form-label">New Password: <span className="required">*</span></label>
                                                <input type="password" className="form-control" {...register("newPassword", PASSWORD_RULE)} placeholder="New Password" autoComplete="off" />
                                                <span className="error">
                                                    {errors.newPassword && errors.newPassword.message}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="quform-element form-group">
                                            <div className="quform-input">
                                                <label className="form-label">Confirm New Password: <span className="required">*</span></label>
                                                <input type="password" className="form-control" {...register("confirmNewPassword", PASSWORD_RULE)} placeholder="Confirm New Password" autoComplete="off" />
                                                <span className="error">
                                                    {errors.confirmNewPassword && errors.confirmNewPassword.message}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="quform-submit-inner">
                                            <button className="butn primary mt-4" type="submit"><span>Change Password</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </section>
    );
};
export default ChangePasswordComponent;