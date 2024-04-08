import Slider2Image from "../../assets/img/content/section2.png";
import Section3Image from "../../assets/img/content/section3.png";
import Section4Image from "../../assets/img/content/section4.png";

const HowItWorksComponent = () => {
    return (
        <div>
            <section className="bg-light md">
                <div className="container-body">
                    <div className="row">
                        <div className="col-lg-5 mb-4 mb-lg-0">
                            <img src={Slider2Image} alt="..."></img>
                        </div>
                        <div className="col-lg-7">
                            <div className="ps-lg-1-9 padding-top-10per">
                                <h2 className="section2-employer">Employer</h2>
                                <p className="w-95 w-md-75 w-lg-80 section2-info-mess">IamInterviewed aims to reduce the burden on Delivery and Recruitment teams to complete the Technical Interviews FASTER.Delivery teams now deliver their clients work without any distractions.</p>
                                <p className="section2-how-it-works">How it works</p>
                                <div className="col-lg-11">
                                    <ul className="list-unstyled section2-links">
                                        <li><i className="fas fa-arrow-alt-circle-right section2-links-link"></i> Register</li>
                                        <li><i className="fas fa-arrow-alt-circle-right section2-links-link"></i> Share profile and job description</li>
                                        <li><i className="fas fa-arrow-alt-circle-right section2-links-link"></i> IamInterviewed schedules and completes interview</li>
                                        <li><i className="fas fa-arrow-alt-circle-right section2-links-link"></i> Shortlist Profile</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-light md scetion3">
                <div className="container-body">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="ps-lg-1-9 padding-top-10per">
                                <h2 className="scetion3-header">Candidates</h2>
                                <p className="w-95 w-md-75 w-lg-80 scetion3-header">IamInterviewed aims to reduce the burden on Delivery and Recruitment teams to complete the Technical Interviews FASTER.Delivery teams now deliver their clients work without any distractions.</p>
                                <p className="scetion3-how-it-works">How it works</p>
                                <div className="col-lg-11">
                                    <ul className="list-unstyled scetion3-links">
                                        <li><i className="fas fa-arrow-alt-circle-right scetion3-links-link"></i> Register</li>
                                        <li><i className="fas fa-arrow-alt-circle-right scetion3-links-link"></i> Schedule Interview</li>
                                        <li><i className="fas fa-arrow-alt-circle-right scetion3-links-link"></i> Get interviewed, RATED</li>
                                        <li><i className="fas fa-arrow-alt-circle-right scetion3-links-link"></i> Get visible</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-4 mb-lg-0">
                            <img src={Section3Image} alt="..."></img>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-light md">
                <div className="container-body">
                    <div className="row">
                        <div className="col-lg-5 mb-4 mb-lg-0">
                            <img src={Section4Image} alt="..."></img>
                        </div>
                        <div className="col-lg-7">
                            <div className="ps-lg-1-9 padding-top-5per">
                                <h2 className="section4-header">Interviewer</h2>
                                <p className="w-95 w-md-75 w-lg-80 section4-info">IamInterviewed aims to reduce the burden on Delivery and Recruitment teams to complete the Technical Interviews FASTER.Delivery teams now deliver their clients work without any distractions.</p>
                                <p className="section4-how-it-works">How it works</p>
                                <div className="col-lg-11">
                                    <ul className="list-unstyled section4-links">
                                        <li><i className="fas fa-arrow-alt-circle-right section4-links-link"></i> Register</li>
                                        <li><i className="fas fa-arrow-alt-circle-right section4-links-link"></i> Get Approval from IamInterviewed</li>
                                        <li><i className="fas fa-arrow-alt-circle-right section4-links-link"></i> Start Interview</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default HowItWorksComponent;