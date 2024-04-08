import React, { useState } from "react";
import { Form } from "react-bootstrap";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = (props: any) => {
    const textField: any = props.fieldProperty;
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const emailRegex = "/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)";

    const validateEmail = (email: string) => {
        if (emailRegex.match(email)) {
            setIsValid(true);
        } else {
            setIsValid(false);
            setMessage('Please enter a valid email!');
        }
    };

    const handleOnChange = (e: any) => {
        setMessage("");
        if (!e.target.validity.valid) {
            if (e.target.type == "text") {
                setMessage(e.target.validationMessage);
            } else if (e.target.type == "email") {
                validateEmail(e.target.value);
            } else {
                setMessage(e.target.validationMessage);
            }
        }
    };

    const handleFocus = (e: any) => {
        setMessage("");
        if (!e.target.validity.valid) {
            if (e.target.type == "text") {
                setMessage(e.target.validationMessage);
            } else if (e.target.type == "email") {
                validateEmail(e.target.value);
            } else {
                setMessage(e.target.validationMessage);
            }
        }
    };

    const handleOnBlur = (e: any) => {
        setMessage("");
        if (!e.target.validity.valid) {
            if (e.target.type == "text") {
                setMessage(e.target.validationMessage);
            } else if (e.target.type == "email") {
                validateEmail(e.target.value);
            } else {
                setMessage(e.target.validationMessage);
            }
        }
    };

    const handleKeyDown = (e: any) => {
        setMessage("");
        if (!e.target.validity.valid) {
            if (e.target.type == "text") {
                setMessage(e.target.validationMessage);
            } else if (e.target.type == "email") {
                validateEmail(e.target.value);
            } else {
                setMessage(e.target.validationMessage);
            }
        }
    };

    const {
        className,
        inputClassName,
        labelClassName,
        type,
        label,
        placeholder,
        readOnly,
        multi,
        maxLength,
        autoFocus,
        value,
        error
    } = props;

    const _className = cx(styles.container, className);
    const _inputClassName = cx(
        {
            [styles.input]: !multi,
            [styles.textarea]: multi,
            [styles.readonly]: readOnly,
            [styles.hasError]: error
        },
        inputClassName
    );

    const _labelClassName = cx(styles.label, labelClassName, {
        [styles.error]: error
    });
    const _helperTextClassName = cx(styles.message, { [styles.error]: error });
    const _areaClassName = cx(styles.area);

    let _props = {
        autoFocus,
        placeholder,
        value,
        readOnly,
        maxLength,
        className: _inputClassName,
        onChange: handleOnChange,
        onFocus: handleFocus,
        onBlur: handleOnBlur,
        onKeyDown: handleKeyDown
    };

    return (
        <div className={_className}>
            {textField.labelName ? <Form.Label className={_labelClassName}>{textField.labelName}</Form.Label> : null}
            {textField.multi ? (
                <div>
                    <textarea className={_inputClassName} name={textField.name} value={textField.value} placeholder={textField.placeholder} />
                </div>
            ) : (
                <Form.Control {..._props} className={_inputClassName} required={textField.required} maxLength={textField.maxLength} name={textField.name} value={textField.value} placeholder={textField.placeholder} type={textField.type} onChange={e => handleOnChange(e)} />
            )}
            {
                <span className={_helperTextClassName}>{message}</span>
            }
        </div>
    )
}

Input.defaultProps = {
    className: "",
    inputClassName: "",
    labelClassName: "",
    type: "text",
    label: "",
    placeholder: "",
    readOnly: false,
    multi: false
};
export default Input;