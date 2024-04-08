import Layout from "../../components/layout/Layout";
import "../../assets/InnerCSS/plugins/bootstrap/css/bootstrap.min.css";
import "../../assets/InnerCSS/plugins/font-awesome/css/font-awesome.min.css";
import "../../assets/InnerCSS/plugins/icomoon/style.css";
import "../../assets/InnerCSS/plugins/uniform/css/default.css";
import "../../assets/InnerCSS/plugins/switchery/switchery.min.css";
import "../../assets/InnerCSS/plugins/nvd3/nv.d3.min.css";
import "../../assets/InnerCSS/css/styles.css";
import "../../assets/InnerCSS/css/custom.css";
import PickUpScheduleComponent from "../../components/interviewer/schedule/PickUpScheduleComponent";

const PickUpSchedule = () => {
    return (
        <Layout>
            <div className="page-title">
                <h4 className="breadcrumb-header"> Pickup Interviews on Your Own</h4>                
            </div>
            <PickUpScheduleComponent />
        </Layout>
    );
};
export default PickUpSchedule;