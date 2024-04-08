import IndexComponent from "../components/index/IndexComponent";
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

const Index: React.FC = (props) => {
    return (
        <div className="main-wrapper" >
            <HeaderOuter />
            <IndexComponent />
            <FooterOuter />
        </div>
    );
};
export default Index;