import logo from "../../assets/img/logos/logo-white.png";
import { useHistory } from "react-router";
import { MouseEvent } from "react";

const FooterOuter = () => {
    const history = useHistory();
    const register = (event: MouseEvent, registerType: string) => {
        event.preventDefault();
        history.push("/register/" + registerType);
    }
    const homeRedirect = (event: MouseEvent) => {
        event.preventDefault();
        history.push("/index");
    }
    return (
        <footer>
            <div className="container-body">
                <div className="row mt-n1-9">
                    <div className="col-lg-4 col-md-6 mt-1-9">
                        <img alt="footer-logo" src={logo} style={{ width: '200px' }} onClick={(e) => { homeRedirect(e); }}></img>
                        <p className="mt-4 text-light-gray">Nemo enim enim voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.</p>
                        <div className="mt-4 footer-social-icons">
                            <ul className="ps-0 mb-0">
                                <li><a href="#!"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#!"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#!"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#!"><i className="fab fa-youtube"></i></a></li>
                                <li><a href="#!"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-1-9">
                        <h3 className="text-white">Quick Links</h3>
                        <ul className="footer-list ps-0">
                            <li><a href="#!">Features</a></li>
                            <li><a href="#!">Pricing</a></li>
                            <li><a href="#!">FAQ</a></li>
                            <li><a href="#!">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-1-9">
                        <h3 className="text-white">Useful Links</h3>
                        <ul className="footer-list ps-0">
                            <li><a onClick={(e) => { register(e, "Candidate"); }}>Candidate</a></li>
                            <li><a onClick={(e) => { register(e, "Interviewer"); }}>Interviewer</a></li>
                            <li><a onClick={(e) => { register(e, "Company"); }}>Employer</a></li>
                            <li><a onClick={(e) => { homeRedirect(e); }}>IamInterviewed</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 mt-1-9">
                        <h3 className="text-white">Legal</h3>
                        <ul className="footer-list ps-0">
                            <li><a href="#!">Terms & Condition</a></li>
                            <li><a href="#!">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bar">
                <div className="container-body">
                    <p className="mb-0">&copy; <span className="current-year"></span> Iam Interviewed is Powered by <a href="#!" className="text-light-gray">Anterntech</a></p>
                </div>
            </div>
        </footer>
    );
};
export default FooterOuter; 