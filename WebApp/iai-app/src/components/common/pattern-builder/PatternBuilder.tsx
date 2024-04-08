import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import PatternBuilderModel from "../../../models/common/PatternBuilder";
import toasterUtils from "../../../utils/toaster-utils";
import modalUtils from "../../../utils/modal-utils";
import Pattern from "../../../models/common/Pattern";
import PatternBody from "../../../models/common/PatternBody";

const PatternBuilder = (props: {
    generatedPattern: (type: string) => void;
}) => {
    const methods = useForm<PatternBuilderModel>({
        mode: "all"
    });

    const optionDropDown = [
        { key: "Any", value: "Any" },
        { key: "UPPERTEXT", value: "A-Z" },
        { key: "LOWERTEXT", value: "a-z" },
        { key: "ANYTEXT", value: "A-Z or a-z" },
        { key: "NUMBER", value: "0-9" },
        { key: "ALPHANUMERIC", value: "A-Z or a-z or 0-9" },
        { key: "INCLUDE", value: "Contains String(s)" },
        { key: "EXCLUDE", value: "Excludes Character" },
    ];

    const occurenceDropDown = [
        { key: "ANY", value: "Zero or More Occurrences" },
        { key: "ATLEAST_ONCE", value: "Atleast One Occurrence" },
        { key: "ZERO_OR_ONE", value: "Zero or One Occurrence" },
        { key: "NO_OF_OCCURS", value: "No of Occurrence" },
    ];

    const [isOccurenceValid, setIsOccurenceValid] = useState([] as boolean[]);
    const [isPatternValid, setIsPatternValid,] = useState([] as boolean[]);
    const [patternBodyData, setPatternBodyData] = useState([] as PatternBody[]);
    const {
        register,
        setValue,
        getValues,
        control,
        watch,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = methods;

    const { fields, append, remove } = useFieldArray({
        name: "body",
        control,
    });

    const generatedPatternWatch = useWatch({
        name: "generatedPattern",
        control,
        defaultValue: "",
    });

    const startswithTypeWatch = useWatch({
        name: "start.value",
        control,
        defaultValue: "",
    });

    useEffect(() => {
        if (!(startswithTypeWatch === 'INCLUDE' || startswithTypeWatch === 'EXCLUDE')) {
            setValue(`start.contains`, "");
        }
    }, [startswithTypeWatch]);

    const endsWithTypeWatch = useWatch({
        name: "end.value",
        control,
        defaultValue: "",
    });

    useEffect(() => {
        if (!(endsWithTypeWatch === 'INCLUDE' || endsWithTypeWatch === 'EXCLUDE')) {
            setValue(`end.contains`, "");
        }
        setValue(`end.contains`, "");
    }, [endsWithTypeWatch]);



    useEffect(() => {
        const pattern = {
            value: "Any",
            contains: "",
            excludes: "",
        };

        const intialValue = [
            {
                betweenbody: pattern,
                occurence: "",
                numbers: "",
            },
        ];

        if (fields.length === 0) {
            append(intialValue);
            setPatternBodyData(intialValue)
            setIsPatternValid([true]);
            setIsOccurenceValid([true]);
        }
    }, []);

    const addNewRow = () => {
        const pattern = {
            value: "Any",
            contains: "",
            excludes: "",
        };

        const betweenValue = {
            betweenbody: pattern,
            occurence: "",
            numbers: "",
        }
        append(betweenValue);
        setPatternBodyData((prevPatternBodyData) => prevPatternBodyData.concat(betweenValue));
        setIsPatternValid((prevPatternBodyData) => prevPatternBodyData.concat(true));
        setIsOccurenceValid((prevOccurenceValid) => prevOccurenceValid.concat(true));
    };

    const deleteRow = (index: number) => {
        remove(index);
    };

    const builddPattern = (data: PatternBuilderModel) => {
    };

    const testPattern = () => {
        const generatedPattern = getValues("generatedPattern");
        const sampleText = getValues("sampleText");
        const testData: Pattern = {
            contains: generatedPattern ? generatedPattern : "",
            value: sampleText ? sampleText : "",
            excludes: "t",
        };
    };

    const applyPattern = () => {
        const generatedPattern = getValues("generatedPattern");
        props.generatedPattern(generatedPattern ? generatedPattern : "");
        modalUtils.closeModal();
    };

    const onSubmit = (data: PatternBuilderModel) => {
        //builddPattern(data);
    };

    const patternGenerator = () => {
        const startwith = getValues("start");
        const body = getValues("body");
        const end = getValues("end");
        const data: PatternBuilderModel = {
            start: startwith,
            body: body,
            end: end,
        };
        builddPattern(data);
    };

    const patternChangeHandler = (index: number, pattern: string) => {
        let disabled = !(pattern === 'INCLUDE' || pattern === 'EXCLUDE');
        let newArr = [...isPatternValid];
        let flagValue;
        if (disabled === true) {
            flagValue = true;
            newArr[index] = true;
            setIsPatternValid(newArr);
        } else {
            flagValue = false;
            newArr[index] = false;
            setIsPatternValid(newArr);
        }
        setValue(`body.${index}.betweenbody.contains`, "");
    }

    const occurenceChangeHandler = (index: number, occurence: string) => {
        let disabled = !(occurence === 'NO_OF_OCCURS');
        let newArr = [...isOccurenceValid];
        let flagValue;
        if (disabled === true) {
            flagValue = true;
            newArr[index] = true;
            setValue(`body.${index}.numbers`, "");
            setIsOccurenceValid(newArr);
        } else {
            flagValue = false;
            newArr[index] = false;
            setIsOccurenceValid(newArr);
        }
    }

    const bodyValueChangeHandler = (index: number, containsValue: string) => {
        setValue(`body.${index}.betweenbody.excludes`, containsValue);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row lineSpace">
                <div className="col-md-6">
                    <label>Starts With</label>
                </div>
            </div>
            <div className="row lineSpace">
                <div className="col-md-3">
                    <select className="inputStyle"
                        {...register("start.value", {
                            required: true,
                        })}>
                        {optionDropDown?.map((optiondata) => (
                            <option value={optiondata.key}>{optiondata.value}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <input className="inputStyle" {...register("start.contains", {})} disabled={!(startswithTypeWatch === 'INCLUDE' || startswithTypeWatch === 'EXCLUDE')} />
                </div>
            </div>
            <div className="row lineSpace">
                <div className="col-md-6">
                    <label>End With</label>
                </div>
            </div>
            <div className="row lineSpace">
                <div className="col-md-3">
                    <select className="inputStyle"
                        {...register("end.value", {
                            required: true,
                        })}>
                        {optionDropDown?.map((optiondata) => (
                            <option value={optiondata.key}>{optiondata.value}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <input className="inputStyle" {...register("end.contains", {})} disabled={!(endsWithTypeWatch === 'INCLUDE' || endsWithTypeWatch === 'EXCLUDE')} />
                </div>
                <div className="col-md-3">
                    <Button variant="primary" type="submit" className="createNewButton" onClick={() => patternGenerator()}
                        disabled={!isValid}>
                        Generate
                    </Button>
                </div>
            </div>
            <div className="row lineSpace">
                <div className="col-md-6">
                    <label>Generated Pattern<span className="required">*</span></label>
                    <div>
                        <input className="inputStyle" {...register("generatedPattern", {})} />
                    </div>
                </div>
                <div className="col-md-6">
                    <label>Enter Sample Text<span className="required">*</span></label>
                    <div>
                        <input className="inputStyle" {...register("sampleText", {})} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Button className="buttonMargin RightAlign createNewButton" onClick={testPattern} disabled={generatedPatternWatch === ""}>
                        Test Pattern
                    </Button>
                    <Button className="buttonMargin RightAlign createNewButton" onClick={applyPattern} disabled={generatedPatternWatch === ""}>
                        Apply Pattern
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default PatternBuilder;