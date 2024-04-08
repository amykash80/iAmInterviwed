import React from "react";
import { Accordion, Card, Image } from "react-bootstrap";
import arrowDown from "../../../assets/chevrondown-icon.svg";
import arrowUp from "../../../assets/chevronup-icon.svg";
import classes from "./CustomAccordion.module.css";

interface AccordionProps {
    title: string;
    expanded: boolean;
    children: React.ReactNode;
    focused: boolean;
    onStateChange: (expanded: boolean) => void;
}

const CustomAccordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    (props, ref) => {
        const accordionRef = ref; 
        const eventKey = props.expanded ? "1" : "0";
        const toggleHanlder = () => {
            props.onStateChange(!props.expanded);
        };
        return (
            <Accordion className="lineSpace" ref={accordionRef} activeKey={eventKey}>
                <Card>
                    <Accordion
                        as={Card.Header}
                        eventKey="1"
                        onClick={toggleHanlder}>
                        <div className="lineSeparator">
                            <div className="sectionHeader">
                                {props.title}
                                <Image src={props.expanded ? arrowDown : arrowUp} alt={props.expanded ? "V" : "^"} 
                                className={classes.chevron} />
                            </div>
                        </div>
                    </Accordion>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>{props.children}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
);
export default CustomAccordion;