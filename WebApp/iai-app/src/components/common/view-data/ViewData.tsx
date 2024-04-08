import React, { useEffect, useState, Fragment, useRef, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import classes from "./ViewData.module.css";
import WebSocketClient from "../../../utils/websocket-client";
import { Accordion, Card, Image } from "react-bootstrap";
import { default as toasterUtils } from "../../../utils/toaster-utils";
import ViewDataModel from "../../../models/ViewData";
import arrowDown from "../../../assets/chevrondown-icon.svg";
import arrowUp from "../../../assets/chevronup-icon.svg";
import AppConfig from "../../../config";

const ViewData = (props: { rowData: ViewDataModel }) => {
    const {
        register,
        getValues,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            topicName: "",
            partition: "",
            description: "",
            replications: 1,
            partitions: 1,
            offset: 0,
            recordsOfLast: 0,
            recordsOfLastTimeUnit: "sec"
        },
    });
    const response: any[] = [];
    const selectAlignmentClass = `<col-md-3> ${classes.recordOfLastTimeSelect}`;
    const [wsResponse, setWsResponse] = useState(response);
    const [wsState, setWsState] = useState(0);
    const [status, setStatus] = useState("");
    const [wsMessages, setWsMessages] = useState<string[]>([]);
    let [isArrowHeadDown, setIsArrowHeadDown] = useState<boolean>(false);
    const wsObject = useRef<WebSocket>();
    const partitionsList: any = [];
    const getPartitionList = () => {
        setValue("topicName", props.rowData.topicName);
        setValue("replications", props.rowData.replications);
        setValue("partitions", props.rowData.partitions);
        const DatastreamName: string = props.rowData.topicName;
    };


    const prepareFilterCriteria = () => {
        let time = getValues("recordsOfLastTimeUnit");
        let offsetValue = getValues("offset");
        let filterCriteria = {
            partition: getValues("partition"),
            offset: offsetValue != null ? offsetValue : 0,
            timeAgoInMillis: 0,
        };
        if (time === null || time === undefined) {
            return JSON.stringify(filterCriteria);
        }

        switch (time) {
            case "sec":
                filterCriteria.timeAgoInMillis = getValues("recordsOfLast") * 1000;
                break;
            case "min":
                filterCriteria.timeAgoInMillis = getValues("recordsOfLast") * 60000;
                break;
            case "hrs":
                filterCriteria.timeAgoInMillis = getValues("recordsOfLast") * 3.6e6;
                break;
            default:
                filterCriteria.timeAgoInMillis = getValues("recordsOfLast") * 1000;
        }
        return JSON.stringify(filterCriteria);
    };

    const connectionHandler = (ws: WebSocket, ev: Event) => {
        setStatus("Open");
        setWsState(ws.readyState);
        ws.send(prepareFilterCriteria());
        return false;
    };

    const messageHandler = (ws: WebSocket, ev: any) => {
        let msg: string[] = wsMessages;
        msg.push(ev.data);
        if (msg.length > 50) {
            msg.pop();
        }
        setWsMessages(msg);
        setWsResponse([...wsMessages]);
    };

    const closeHandler = (ws: WebSocket, ev: Event) => {
        if (ws.bufferedAmount === 0) {
            setStatus("Closed");
            setWsState(ws.readyState);
            ws.close();
        }
    };

    const errorHandler = (ws: WebSocket, ev: Event) => {
        if (ev != undefined) {
            toasterUtils.showError(
                "Unable to fetch records/messages for this Kafka Topic! Please check the details or contact your administrator."
            );
        } else {
            toasterUtils.showError("WebSocket is already in CLOSING or CLOSED state");
        }
    };

    useEffect(() => {
        getPartitionList();
    }, []);

    useEffect(() => {
        return () => {
            if (wsObject.current) {
                wsObject.current.close();
            }
        }
    }, []);

    return (
        <Fragment>
        </Fragment>
    );
};
export default ViewData;