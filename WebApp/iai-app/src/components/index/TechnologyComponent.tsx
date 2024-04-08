import FrontEndImage from "../../assets/img/logos/front-end.png";
import FullStackImage from "../../assets/img/logos/full-stack.png";
import BlockChainImage from "../../assets/img/logos/block-chain.png";
import DataAnalystImage from "../../assets/img/logos/data-analyst.png";
import CloudImage from "../../assets/img/logos/cloud.png";
import AIImage from "../../assets/img/logos/ai.png";
import IOTImage from "../../assets/img/logos/iot.png";
import CyberSecurityImage from "../../assets/img/logos/cyber-security.png";
import JSImage from "../../assets/img/logos/js.png";
import JavaImage from "../../assets/img/logos/java.png";
import AngularImage from "../../assets/img/logos/angular.png";
import PythonImage from "../../assets/img/logos/python.png";
import DotNetImage from "../../assets/img/logos/dot-net.png";
import ReactImage from "../../assets/img/logos/react.png";
import SqlImage from "../../assets/img/logos/sql.png";
import PhpImage from "../../assets/img/logos/php.png";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const TechnologyComponent = () => {
    return (
        <section className="md">
            <div className="container-body">
                <div className="text-center section-heading">
                    <h2 className="section5-heading">Browse Technology/Categories</h2>
                    <p className="w-95 w-md-75 w-lg-55 section5-info">Explore the top trending jobs and find the perfect match for your skills and experience. Take a look at our list and kickstart your dream career today!</p>
                </div>
                <div className="card-body">
                    <Tabs defaultActiveKey="CategoriesTab" transition={false} id="noanim-tab-example" className="nav nav-tabs justify-content-center tab-index-page">
                        <Tab eventKey="CategoriesTab" title="Categories" className="tab-content-index-page">
                            <div className="row mt-n1-9 section5-tabpane">
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box" >
                                        <div>
                                            <span>
                                                <img src={FrontEndImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Frontend Developer</a></h3>
                                        <p>245 Candidates.</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={FullStackImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Full stack developer</a></h3>
                                        <p>1000 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={BlockChainImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Blockchain</a></h3>
                                        <p>570 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box active">
                                        <div>
                                            <span> <img src={DataAnalystImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Data Analyst</a></h3>
                                        <p>700 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box" >
                                        <div>
                                            <span> <img src={CloudImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Cloud & AWS</a></h3>
                                        <p>800 Candidates.</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={AIImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">AI & ML</a></h3>
                                        <p>1200 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={IOTImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Internet of Things</a></h3>
                                        <p>200 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box active">
                                        <div>
                                            <span> <img src={CyberSecurityImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Cyber Security</a></h3>
                                        <p>3000 Candidates</p>
                                    </div>
                                </div>

                            </div>
                        </Tab>
                        <Tab eventKey="TechnologiesTab" title="Technology" className="tab-content-index-page">
                            <div className="row mt-n1-9 section5-tabpane">
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box" >
                                        <div>
                                            <span> <img src={JSImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Java Script</a></h3>
                                        <p>245 Candidates.</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={JavaImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Java</a></h3>
                                        <p>1000 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={AngularImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Angular</a></h3>
                                        <p>570 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box active">
                                        <div>
                                            <span> <img src={PythonImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Python</a></h3>
                                        <p>700 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box" >
                                        <div>
                                            <span> <img src={DotNetImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">Dot Net</a></h3>
                                        <p>245 Candidates.</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={ReactImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">React</a></h3>
                                        <p>1000 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box">
                                        <div>
                                            <span> <img src={SqlImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">My SQL</a></h3>
                                        <p>570 Candidates</p>
                                    </div>
                                </div>
                                <div className="services-block-two col-lg-3 col-md-6 mt-1-9">
                                    <div className="inner-box active">
                                        <div>
                                            <span> <img src={PhpImage} alt="" className="section5-tabpane-image"></img></span>
                                        </div>
                                        <h3><a href="#!">php</a></h3>
                                        <p>700 Candidates</p>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};
export default TechnologyComponent;