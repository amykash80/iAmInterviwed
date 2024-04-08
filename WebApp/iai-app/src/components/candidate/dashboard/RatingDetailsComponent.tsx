import { useRef, MouseEvent, useState, useEffect } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import '../../../assets/InnerCSS/css/rating.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IAIEnum } from "../../../models/enums/IAIEnum";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import InterviewRatingModel from "../../../models/interviewer/response/InterviewRatingModel";
import modalUtils from "../../../utils/modal-utils";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { toPng } from 'html-to-image';

interface RatingDetailsProps {
    objRatingDetails: InterviewRatingModel;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RatingDetailsComponent = (props: RatingDetailsProps) => {
    let softSkillRatingList = props.objRatingDetails.softSkillRating.map(x => x.rating);
    const softSkillRating: number = softSkillRatingList.reduce((a, b) => a + b) / softSkillRatingList.length
    const labels = props.objRatingDetails.technicalSkillRating.map(x => x.secondarySkillName);
    const rating = props.objRatingDetails.technicalSkillRating.map(x => x.rating);
    const [data, setData] = useState({
        labels: labels,
        datasets: [{
            label: 'RATING BY SKILL',
            data: rating,
            backgroundColor: [
                '#3e98c7'
            ],
            borderColor: [
                '#3e98c7'
            ],
            borderWidth: 1,
            options: {
                scales: {
                    yAxes: [{
                        beginAtZero: true
                    }]
                }
            }
        }]
    });

    const downloadPdf = () => {
        const input = document.getElementById('rating-div') as HTMLElement;
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

    const printPreview = () => {

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
                        <a className="model-header-buttons" title="Print Rating" id="btnImageDownload1" onClick={() => printPreview()}><i className="fa fa-print" aria-hidden="true"></i></a>
                        <a className="model-header-buttons" title="Load Preview" id="btnImageDownload" onClick={() => downloadImage()}><i className="fa fa-image" aria-hidden="true"></i></a>
                    </div>
                </div>
                <Tabs defaultActiveKey="IAIRatingDetails" transition={false} id="noanim-tab-example" className="mb-3 rating-tab">
                    <Tab eventKey="IAIRatingDetails" title="Rating Details">
                        <div id="rating-div">
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4"><span className="rating-block-cand-name">{props.objRatingDetails.candidateName}</span></div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="card card-white">
                                        <div className="card-body rating-donut">
                                            <CircularProgressbar value={(Number(props.objRatingDetails.totalRating) / IAIEnum.MaxRating) * 100} text={`${props.objRatingDetails.totalRating}/${IAIEnum.MaxRating}`} strokeWidth={7}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="card card-white">
                                        <div className="card-body rating-skill-chart">
                                            <Bar data={data} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card card-white no-padding">
                                        <div className="card-body padding-10">
                                            <h2 id="" className="rating-block-header">Technical Rating ({props.objRatingDetails.totalRating} / {IAIEnum.MaxRating})</h2>
                                            {props.objRatingDetails.technicalSkillRating.map((rating, index) => (
                                                <div className="row rating-block-skill-row">
                                                    <div className="col-md-12"><span className="rating-block-skill-name">{rating.secondarySkillName}</span>: <span className="rating-block-rating">{rating.rating}</span></div>
                                                    <div className="col-md-12"><span className="rating-block-comments">{rating.comments}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card card-white no-padding">
                                        <div className="card-body padding-10">
                                            <h2 id="" className="rating-block-header">Soft Skill Rating ({softSkillRating} / {IAIEnum.MaxRating})</h2>
                                            {props.objRatingDetails.softSkillRating.map((rating, index) => (
                                                <div className="row rating-block-skill-row">
                                                    <div className="col-md-12"><span className="rating-block-skill-name">{rating.softSkillName}</span>: <span className="rating-block-rating">{rating.rating}</span></div>
                                                    <div className="col-md-12"><span className="rating-block-comments">{rating.comments}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card card-white no-padding">
                                        <div className="card-body padding-10">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h2 id="" className="rating-block-header">Interviewer Comments</h2>
                                                    <p>{props.objRatingDetails.interviewerComments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="TechnicalRatingDetails" title="Rating Details">
                        Technical
                    </Tab>
                </Tabs>
                <button className="btn btn-primary btn-form" type="button" onClick={() => modalUtils.closeModal()}><span>Close</span></button>
            </div>
        </div>
    );
};
export default RatingDetailsComponent;