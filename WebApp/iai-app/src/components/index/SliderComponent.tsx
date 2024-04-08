import SliderBottomImage from "../../assets/img/content/hero-img.png";

const SliderComponent = () => {
    return (
        <section className="bg-light md index-slider">
            <div className="container-body">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="ps-lg-1-9 padding-top-10per">
                            <h2 className="index-slider-tech-inter">Technical Interviews</h2>
                            <h2 className="index-slider-ondemand">On Demand</h2>
                            <div className="col-lg-11">
                                <div className="row mt-n4" >
                                    <div className="col-sm-4 mt-4">
                                        <div className="counter-box">
                                            <h4 className="countup text-white d-block">140,000</h4>
                                            <p className=" font-weight-600 text-white m-0  index-slider-completed-interviews">Completed interviews</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-4">
                                        <div className="counter-box">
                                            <h4 className="countup text-white d-block">300</h4>
                                            <p className=" font-weight-600 text-white m-0 index-slider-companies-registered">Companies registered</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-4">
                                        <div className="counter-box">
                                            <h4 className="countup text-white d-block">2,000</h4>
                                            <p className=" font-weight-600 text-white m-0 index-slider-interviewers">Interviewers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="butn primary small mt-4" href="#!"><span>Register as  Interviewer</span></a>
                            &ensp;<a className="butn white small mt-4" href="#!"><span>Register as  Candidate</span></a>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <img src={SliderBottomImage} alt="..."></img>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SliderComponent;