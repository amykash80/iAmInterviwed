import Layout from "../../components/layout/Layout";
import { useAppSelector } from "../../context-store";
import { RoleEnum } from "../../models/enums/RoleEnum";
import { Redirect, useHistory } from "react-router";
const Home = () => {
    const history = useHistory();
    let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
    if (loggedInUser != null) {
        if(loggedInUser.roleId.toString() === RoleEnum.Interviewer.toString()) {
            history.push("/interviewer-dashboard");
        } else if(loggedInUser.roleId.toString() === RoleEnum.Candidate.toString()) {
            history.push("/candidate-dashboard");
        }
        else if(loggedInUser.roleId.toString() === RoleEnum.ClientAdmin.toString()) {
            history.push("/company-dashboard");
        }
        else if(loggedInUser.roleId.toString() === RoleEnum.ClientRecruiter.toString()) {
            history.push("/recruiter-dashboard");
        }
        else if(loggedInUser.roleId.toString() === RoleEnum.Vendor.toString()) {
            history.push("/vendor-dashboard");
        }
    }
    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header">Home</h4>
            </div>
        </Layout>
    );
};
export default Home;