const reactSelectStyles = {
    control: (provided: any, state: { isFocused: any; }) => ({
        ...provided,
        background: '#fff',
        borderColor: '#212121;',
        minHeight: '32px',
        height: '32px',
        cursor: 'text',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: '32px',
        padding: '0 6px',
    }),

    input: (provided: any, state: any) => ({
        ...provided,
        margin: '0px',
    }),

    indicatorsContainer: (provided: any, state: any) => ({
        ...provided,
        height: '32px',
    }),
};
export default reactSelectStyles;