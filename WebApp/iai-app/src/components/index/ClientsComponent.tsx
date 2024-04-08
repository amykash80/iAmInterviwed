import Client1Image from "../../assets/img/partners/client-01.png";
import Client2Image from "../../assets/img/partners/client-02.png";
import Client3Image from "../../assets/img/partners/client-03.png";
import Client4Image from "../../assets/img/partners/client-04.png";
import Client5Image from "../../assets/img/partners/client-05.png";
import Client6Image from "../../assets/img/partners/client-06.png";

const SliderComponent = () => {
    return (
        <div className="section-clients bg-light">
            <div className="text-center section-heading">
                <h2 className="section-clients-header">Our Clients</h2>
                <p className="w-95 w-md-75 w-lg-55 section-clients-info">Our trusted clients who has partnered with us for better candidates</p>
            </div>
            <div className="container section-clients-container">
                <div className="owl-carousel owl-theme clients" id="clients">
                    <div className="item"><img alt="..." src={Client1Image}></img></div>
                    <div className="item"><img alt="..." src={Client2Image}></img></div>
                    <div className="item"><img alt="..." src={Client3Image}></img></div>
                    <div className="item"><img alt="..." src={Client4Image}></img></div>
                    <div className="item"><img alt="..." src={Client5Image}></img></div>
                    <div className="item"><img alt="..." src={Client6Image}></img></div>
                </div>
            </div>
        </div>
    );
};
export default SliderComponent;