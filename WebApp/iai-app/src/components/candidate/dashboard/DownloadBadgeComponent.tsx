import { useRef, MouseEvent, useState, useEffect } from "react";
import '../../../assets/InnerCSS/css/rating.css';
import { IAIEnum } from "../../../models/enums/IAIEnum";
import InterviewRatingModel from "../../../models/interviewer/response/InterviewRatingModel";
import modalUtils from "../../../utils/modal-utils";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { toPng } from 'html-to-image';
import logo from "../../../assets/img/logos/logo.png";
import badgeURL from "../../../assets/InnerCSS/img/badge.png";

interface RatingDetailsProps {
    objRatingDetails: InterviewRatingModel;
}
const DownloadBadgeComponent = (props: RatingDetailsProps) => {
    const secondarySkillList: string = props.objRatingDetails.secondarySkills.map(x => x.secondarySkillName).toString();

    const downloadPdf = () => {
        const input = document.getElementById('badge-div') as HTMLElement;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape'
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(props.objRatingDetails.candidateName + ".pdf");
        });
    }

    const downloadImage = () => {
        const source = document.getElementById('badge-div') as HTMLElement;
        toPng(source, { cacheBust: false }).then((dataUrl) => {
            const link = document.createElement("a");
            link.download = props.objRatingDetails.candidateName + ".png";
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <a className="model-header-buttons" title="Download Rating as Pdf" id="btnGeneratePdf" onClick={() => downloadPdf()}><i className="fa fa-file-pdf" aria-hidden="true"></i></a>
                        <a className="model-header-buttons" title="Load Preview" id="btnImageDownload" onClick={() => downloadImage()}><i className="fa fa-image" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="row" id="badge-div">

                    <section className="badgewrapper-iai">
                        <div className="badgeflex">
                            <div>
                                <img id="logo" className="rating-iai-logo-img" src={logo} alt="logo"></img>
                            </div>
                            <div className="badgeflex">
                                <h1 className="rating-iai-candidate-name"> {props.objRatingDetails.candidateName}</h1>
                                <p className="rating-iai-interviewid"><span>ID:</span> {props.objRatingDetails.interviewUniqueId}</p>
                                <p className="rating-iai-primary-skill"><span>Primary Skill :</span> {props.objRatingDetails.primarySkillName}</p>
                                <ul className="rating-iai-secondary-skills">
                                    {props.objRatingDetails.technicalSkillRating.map((field, index) => (
                                        <li>{field.secondarySkillName} : {field.rating}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="badgeflex">
                            <img src={badgeURL} className="rating-iai-badge-img" alt="" />
                            <div className="badge-rating-img-container">
                                <h1 className="rating-iai-badge-skill" >{props.objRatingDetails.primarySkillName}</h1>
                                <h1 className="rating-iai-badge-rating">
                                    {props.objRatingDetails.totalRating} / {IAIEnum.MaxRating}
                                </h1>
                            </div>
                            <p className="rating-iai-verify"><span>VERIFY AT</span><br></br> www.iaminterviewed.com</p>
                        </div>
                    </section>
                    {/*<div className="container-body register-image">
                         <div className="col-md-12 register-image-name padding-0">
                            <p className="badge-candidate-name">{props.objRatingDetails.candidateName}</p>
                        </div>
                        <div className="col-md-12 register-image-rating">
                            <h3 className="badge-rating">{props.objRatingDetails.totalRating}/{IAIEnum.MaxRating}</h3>
                        </div>
                        <div className="col-md-12">
                            <p className="register-image-skill">{secondarySkillList}</p>
                        </div>
                        <div className="col-md-12">
                            <p className="register-image-info">Visit to verify at <br /> www.iaminterviewed.com</p>
                        </div> </div>*/}
                </div>
            </div>
        </div>
    );
};
export default DownloadBadgeComponent;