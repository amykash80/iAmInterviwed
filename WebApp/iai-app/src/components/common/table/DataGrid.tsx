import React, { useEffect } from "react";
import BootstrapTable, { ColumnDescription, SortOrder } from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAppSelector } from "../../../context-store";
import dateUtils from "../../../utils/date-utils";
import "./ReactTableCustom.css";
import styles from "./TableGrid.module.css";
//Rename type and export as our custom type to avoid
//dependency on library
export type Column = ColumnDescription & { title?: boolean | Function } & { headerTitle?: boolean | string };
export type DefaultSorted = [{ dataField: any; order: SortOrder }];
type RowSelectionType = "Single" | "Multiple" | "None" | "undefined";
type modeType = "radio" | "checkbox" | "ROW_SELECT_DISABLED";
let modeValue: modeType;
let tableStyle = styles.groupTable;

export interface GridProps<T> {
    uniqueField: string;
    data: T[];
    columns: Column[];
    rowSelectionMode?: RowSelectionType;
    onRowSelect?: (row: object, selected: boolean, rowIndex: number) => void;
    onAllRowsSelect?: (rows: object[], selected: boolean) => void;
    defaultSelection?: string[] | number[];
    defaultNonSelectable?: number[];
    hideSelectAll?: boolean;
    disableSelectAll?: boolean;
    disablePagination?: boolean;
    defaultSorted?: DefaultSorted;
    enableScroll?: boolean;
    filterRequired?: boolean;
    paginationSize?: number;
    withFirstAndLast?: boolean;
}

const DataGrid = function <T>(props: GridProps<T>) {
    let filterRequired = true;
    if (props.enableScroll ? props.enableScroll : false) {
        tableStyle = styles.groupTableScroll;
    } else {
        tableStyle = styles.groupTable;
    }
    if (props.filterRequired !== undefined) {
        filterRequired = props.filterRequired;
    }
    if (props.rowSelectionMode === "None") {
        modeValue = "ROW_SELECT_DISABLED";
    } else if (props.rowSelectionMode === "Single") {
        modeValue = "radio";
    } else if (props.rowSelectionMode === "Multiple") {
        modeValue = "checkbox";
    } else if (props.rowSelectionMode === undefined) {
        modeValue = "ROW_SELECT_DISABLED";
    }
     const userTimeZone = useAppSelector(
         (state) => ""
     );
    const customTotal = (from: number, to: number, size: number) => (
        <div className={styles.totalTextalign}>
            <span className="react-bootstrap-table-pagination-total">
                Showing {from} - {to} out of {size} records
            </span>
            <div className={styles.showClass}>
                <span>Show </span>
            </div>
            <div className={styles.recordClass}>
                <span>records/page</span>
            </div>
        </div>
    );
    const disablePaginationOptions = {
        hidePageListOnlyOnePage: true,
        sizePerPageList: [{
            text: "All",
            value: props.data ? props.data.length : 0,
        }]
    };

    const options = {
        paginationSize: props.paginationSize ? props.paginationSize : 4,
        pageStartIndex: 1,
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        withFirstAndLast: props.withFirstAndLast ? props.withFirstAndLast : true,
        onSizePerPageChange: () => {
            window.scrollTo(0, 0);
        },
        onPageChange: () => {
            window.scrollTo(0, 0);
        },
        sizePerPageList: [
            {
                text: "10",
                value: 10
            },
            {
                text: "25",
                value: 25
            },
            {
                text: "50",
                value: 50
            },
            {
                text: "All",
                value: props.data ? props.data.length : 0
            }
        ]
    };

    let paginationOptions = null;
    if (props.disablePagination) {
        paginationOptions = disablePaginationOptions;
    } else {
        paginationOptions = options;
    }

    const customCols: Column[] = props.columns.map((propCol: Column) => {
        let col = { ...propCol };
        if (col.text != "ACTIONS" && filterRequired === true) {
            col.filter = textFilter({
                placeholder: " ",
                className: `${styles.filterClass}`
            });
            col.classes = `${styles.columnStyle} `;
            if (col.dataField.indexOf('Date') !== -1 || col.dataField.toUpperCase().indexOf('TIMESTAMP') !== -1) {
                col.title = function callback(cell: any, row: any, rowIndex: any, colIndex: any) {
                    if (row.userAuditInfo && row.userAuditInfo.lastUpdatedDatetime !== "") {
                        return dateUtils.toDateWithTimeZone(
                            row.userAuditInfo.lastUpdatedDatetime,
                            userTimeZone ? userTimeZone : ""
                        );
                    } else if (row.userActionInfo && row.userActionInfo.lastModifiedDate !== "") {
                        return dateUtils.toDateWithTimeZone(
                            row.userActionInfo.lastModifiedDate,
                            userTimeZone ? userTimeZone : ""
                        );
                    } else if (row.lastModifiedDate && row.lastModifiedDate !== "") {
                        return dateUtils.toDateWithTimeZone(
                            row.lastModifiedDate,
                            userTimeZone ? userTimeZone : ""
                        );
                    } else if (row.lastUpdatedDatetime && row.lastUpdatedDatetime !== "") {
                        return dateUtils.toDateWithTimeZone(
                            row.lastUpdatedDatetime,
                            userTimeZone ? userTimeZone : ""
                        );
                    } else if (row.createdDate && row.createdDate !== "") {
                        return dateUtils.toDateWithTimeZone(
                            row.createdDate,
                            userTimeZone ? userTimeZone : ""
                        );
                    } else {
                        return "";
                    }
                };
            } else {
                col.title = true;
            }
            col.sort = true;
            col.headerTitle = col.text;
        }
        if (filterRequired === false) {
            col.classes = `${styles.columnStyle} `;
            col.title = true;
        }
        col.headerClasses = `${styles.tableRow}`;
        return col;
    });
    const rowStyle = { height: 30, width: 140 };

    if (modeValue !== "ROW_SELECT_DISABLED") {
        if (props.disablePagination) {
            return (
                <div className={tableStyle}>
                    <BootstrapTable
                        keyField={props.uniqueField}
                        data={props.data ? props.data : []}
                        columns={customCols}
                        striped
                        hover
                        condensed
                        //pagination={paginationFactory(disablePaginationOptions)}
                        selectRow={{
                            mode: modeValue,
                            clickToSelect: false,
                            selected: props.defaultSelection,
                            nonSelectable: props.defaultNonSelectable,
                            selectionHeaderRenderer: props.disableSelectAll
                                ? ({ mode, checked, indeterminate }) => (
                                    <input type="checkbox" disabled></input>
                                )
                                : undefined,
                            // hideSelectAll: props.hideSelectAll,
                            headerColumnStyle: {
                                backgroundColor: "#424242",
                            },
                            onSelect: (row, isSelect, rowIndex, e) => {
                                if (props.onRowSelect) {
                                    //return false only when the select/deselect should not reflect in ui...default return is assumed as true
                                    return props.onRowSelect(row, isSelect, rowIndex);
                                }
                                return true;
                            },
                            onSelectAll: (isSelect, rows, e) => {
                                if (props.disableSelectAll) {
                                    //not allowing selectAll without using hideSelectAll
                                    return [];
                                }
                                if (props.onAllRowsSelect) {
                                    props.onAllRowsSelect(rows, isSelect);
                                }
                            },
                        }}
                        filter={filterFactory()}
                        rowStyle={rowStyle}
                        defaultSorted={props.defaultSorted}
                    />
                </div>
            );
        } else {
            return (
                <div className={tableStyle}>
                    <BootstrapTable
                        keyField={props.uniqueField}
                        data={props.data ? props.data : []}
                        columns={customCols}
                        striped
                        hover
                        condensed
                        pagination={paginationFactory(options)}
                        selectRow={{
                            mode: modeValue,
                            clickToSelect: false,
                            selected: props.defaultSelection,
                            nonSelectable: props.defaultNonSelectable,
                            headerColumnStyle: {
                                backgroundColor: "#424242",
                            },
                            selectionHeaderRenderer: props.disableSelectAll
                                ? ({ mode, checked, indeterminate }) => (
                                    <input type="checkbox" disabled></input>
                                )
                                : undefined,
                            // hideSelectAll: props.hideSelectAll,
                            onSelect: (row, isSelect, rowIndex, e) => {
                                if (props.onRowSelect) {
                                    //return false only when the select/deselect should not reflect in ui...default return is assumed as true
                                    return props.onRowSelect(row, isSelect, rowIndex);
                                }
                                return true;
                            },
                            onSelectAll: (isSelect, rows, e) => {
                                if (props.disableSelectAll) {
                                    return [];
                                }
                                if (props.onAllRowsSelect) {
                                    props.onAllRowsSelect(rows, isSelect);
                                }
                            },
                        }}
                        filter={filterFactory()}
                        rowStyle={rowStyle}
                        defaultSorted={props.defaultSorted}
                    />
                </div>
            );
        }
    } else {
        if (props.disablePagination) {
            return (
                <div className={tableStyle}>
                    <BootstrapTable
                        keyField={props.uniqueField}
                        data={props.data ? props.data : []}
                        columns={customCols}
                        striped
                        hover
                        condensed
                        filter={filterFactory()}
                        //pagination={paginationFactory(disablePaginationOptions)}
                        rowStyle={rowStyle}
                        defaultSorted={props.defaultSorted}
                    />
                </div>
            );
        } else {
            return (
                <div className={tableStyle}>
                    <BootstrapTable
                        keyField={props.uniqueField}
                        data={props.data ? props.data : []}
                        columns={customCols}
                        striped
                        hover
                        condensed
                        filter={filterFactory()}
                        pagination={paginationFactory(options)}
                        rowStyle={rowStyle}
                        defaultSorted={props.defaultSorted}
                    />
                </div>
            );
        }
    }
};
export default DataGrid;