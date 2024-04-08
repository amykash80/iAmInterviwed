import { RegisterOptions } from "react-hook-form";

export const OBJECT_NAME_RULE: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^(?:[A-Za-z ]\w*)+$/g,
        message:
            "Name should starts with alphabets and allows alphanumeric,underscore",
    },
    maxLength: {
        value: 20,
        message: "Name length can not exceed 20 characters",
    },
};

export const EMAIL_RULE: RegisterOptions = {
    required: "Email is required",
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/,
        message:
            "Invalid Email format",
    }
};
export const MOBILE_NUMBER_RULE: RegisterOptions = {
    required: "Mobile Number is required",
    pattern: {
        value: /[6-9]{1}[0-9]{9}/,
        message:
            "Invlaid mobile number",
    },
    maxLength: {
        value: 10,
        message: "check the length of mobile number",
    },
};

export const WEBSITE_RULE: RegisterOptions = {
    required: "Website is required",
    pattern: {
        value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
        message:
            "Invlaid Website",
    },
    maxLength: {
        value: 250,
        message: "check the length of Website",
    },
};

export const CURRENT_PAY_RULE: RegisterOptions = {
    required: "Current Pay is required",
    pattern: {
        value: /^(?:[A-Za-z ]\w*)+$/g,
        message:
            "Name should starts with alphabets and allows alphanumeric,underscore",
    },
    maxLength: {
        value: 2,
        message: "Current pay length can not exceed 2 characters",
    },
};

export const OBJECT_VALUE_RULE: RegisterOptions = {
    required: "The field is required",
    pattern: {
        value: /[^\\<>&]+$/gi,
        message: "Special characters \\, <, > and & are not allowed,",
    },
    maxLength: {
        value: 60,
        message: "The field length can not exceed 60 characters",
    },
};

export const OBJECT_DESCRIPTION_RULE: RegisterOptions = {
    required: false,
    pattern: {
        value: /^[^<>@&\\]*$/,
        message: "Special characters are not allowed",
    },
    maxLength: {
        value: 500,
        message: "Description can not exceed 500 characters",
    },
};

export const WFOBJECT_DESCRIPTION_RULE: RegisterOptions = {
    required: false,
    pattern: {
        value: /^[^<>&\\]*$/,
        message: "Special characters \\, <, > and & are not allowed",
    },
    maxLength: {
        value: 200,
        message: "Description can not exceed 200 characters",
    },
};

export const INSTANCE_DESCRIPTION_RULE: RegisterOptions = {
    required: "Description field is required",
    pattern: {
        value: /[^\\<>&]+$/gi,
        message: "Special characters \\, <, > and & are not allowed,",
    },
    maxLength: {
        value: 250,
        message: "This field length can not exceed 250 characters",
    },
};

export const INSTANCE_CONTAINERNAME_RULE: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^(?:[A-Za-z]\w*)+$/g,
        message: "Field should starts with alphabets and allows alphanumeric,underscore without hyphen and space",
    },
    maxLength: {
        value: 60,
        message: "This field length can not exceed 60 characters",
    },
};

export const INSTANCE_HOST_RULE: RegisterOptions = {
    required: "Hostname is required",
    pattern: {
        value: /^[a-zA-Z0-9:/.-]+$/g,
        message: "Hostname field allows alphanumeric, slash, colon, dot and hyphen",
    },
};

export const NO_SPECIAL_CHAR: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^[a-zA-Z0-9:/.-]+$/g,
        message: "This field allows alphanumeric, slash, colon, dot and hyphen",
    },
};


export const NO_SPECIAL_CHAR_ALLOWED: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^[a-zA-Z0-9-]+/g,
        message: "No Special Character allowed",
    },
};

export const PORT_RULE: RegisterOptions = {
    required: "Port field is required",
};

export const INSTANCE_PORT_RULE: RegisterOptions = {
    required: "Port field is required",
    pattern: {
        value: /^[a-zA-Z0-9:/.-]+$/g,
        message: "This field allows alphanumeric, slash, colon, dot and hyphen",
    },
    maxLength: { value: 5, message: "Maximum length is 5 digits " },
};

export const INSTANCE_PRIVATEIP_RULE: RegisterOptions = {
    required: "Private IP is required",
    pattern: {
        value: /^[\w_.-]+$/g,
        message:
            "Private IP field allows alphanumeric,underscore, dot,hyphen and no space",
    },
    maxLength: {
        value: 200,
        message: "The field length can not exceed 200 characters",
    },
};
export const INSTANCE_DATABASE_RULE: RegisterOptions = {
    required: "Database Name is required",
    pattern: {
        value: /^[\w=_.-]+$/g,
        message:
            "Database field allows alphanumeric, dot,hyphen,underscore,equal and no space",
    },
    maxLength: {
        value: 250,
        message: "The field length can not exceed 250 characters",
    },
};

export const INSTANCE_SERVICE_RULE: RegisterOptions = {
    required: "Service Name is required",
    pattern: {
        value: /^[\w=_.-]+$/g,
        message:
            "Service field allows alphanumeric, dot,hyphen,underscore,equal and no space",
    },
    maxLength: {
        value: 250,
        message: "The field length can not exceed 250 characters",
    },
};

export const INSTANCE_BUSINESS_RULE: RegisterOptions = {
    required: "Business Name is required",
    pattern: {
        value: /^[\w\s#$()_.-]+$/g,
        message: "Business field allows allow alphanumeric, #, $, ( , ), _, -,.",
    },
    maxLength: {
        value: 250,
        message: "The field length can not exceed 250 characters",
    },
};

export const LOCATION_INPUT: RegisterOptions = {
    required: "Location is required",
    pattern: {
        value: /[^\\<>&]+$/gi,
        message: "Special characters \\, <, > and & are not allowed,",
    },
    maxLength: {
        value: 250,
        message: "The field length can not exceed 250 characters",
    },
};

export const JOB_RULE: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^[A-Za-z]+[A-Za-z0-9-_]*$/g,
        message:
            "This field should starts with alphabets and allows alphanumeric,underscore,hyphen and no space",
    },
    maxLength: {
        value: 60,
        message: "This field length can not exceed 60 characters",
    },
};
export const JOB_DESC: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^(?:[A-Za-z ]\w*)+$/g,
        message:
            "This field starts with alphabets and allows alphanumeric,underscore,hypen and space",
    },
    maxLength: {
        value: 250,
        message: "This field length can not exceed 250 characters",
    },
};

export const NO_NEGATIVE_REQUIRED: RegisterOptions = {
    required: "This field is required",
    min: {
        value: 1,
        message: "Value should not be negative",
    },
};

export const NO_NEGATIVE: RegisterOptions = {
    required: "This field is required",
    min: {
        value: 1,
        message: "Value should not be negative",
    },
    max: {
        value: 500,
        message: "Maximum limit is 500",
    },
};

export const NO_NEGATIVE_REQUIRED_FALSE: RegisterOptions = {
    required: false,
    max: {
        value: 500,
        message: "Maximum limit is 500",
    },
};

export const PASSWORD_RULE: RegisterOptions = {
    required: "Password is required",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g,
        message:
            "Should include at least one uppercase letter, one lowercase, letter, one special character and one numeric.",
    },
    minLength: {
        value: 8,
        message: "Password should be at least 8 characters.",
    },
};

export const NO_SPCLCHAR_GROUPBY: RegisterOptions = {
    required: "Group By is required",
    pattern: {
        value: /^[a-zA-Z0-9_$,]+$/g,
        message:
            "GroupBy allows alphanumeric,underscore,coma,dollar and no space",
    }
};

export const TRANS_NAME_RULE: RegisterOptions = {
    required: "This field is required",
    pattern: {
        value: /^(?:[A-Za-z])[a-zA-Z0-9_]+$/g,
        message:
            "This field should starts with alphabets and allows alphanumeric,underscore and no space",
    },
    maxLength: {
        value: 60,
        message: "This field length can not exceed 60 characters",
    },
};

export const NO_SPCLCHAR_GROUPBY_NON_MANDATORY: RegisterOptions = {
    pattern: {
        value: /^[a-zA-Z0-9_$,]+$/g,
        message:
            "GroupBy allows alphanumeric,underscore,coma,dollar and no space",
    },
};