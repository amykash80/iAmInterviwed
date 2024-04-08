import Layout from "../../components/layout/Layout";
import "../../assets/InnerCSS/plugins/bootstrap/css/bootstrap.min.css";
import "../../assets/InnerCSS/plugins/font-awesome/css/font-awesome.min.css";
import "../../assets/InnerCSS/plugins/icomoon/style.css";
import "../../assets/InnerCSS/plugins/uniform/css/default.css";
import "../../assets/InnerCSS/plugins/switchery/switchery.min.css";
import "../../assets/InnerCSS/plugins/nvd3/nv.d3.min.css";
import "../../assets/InnerCSS/css/styles.css";
import "../../assets/InnerCSS/css/custom.css";
import InterviewerDashboardComponent from "../../components/interviewer/dashboard/InterviewerDashboardComponent";

const InterviewerDashboard = () => {
    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header"> DASHBOARD</h4>                
            </div>
            <InterviewerDashboardComponent />
        </Layout>
    );
};
export default InterviewerDashboard;