import React, { createElement } from 'react';
import styled from 'styled-components';

const Label = styled.label`
    font-size: 15px;
    margin-bottom: 5px;
    &:after {
        content: ${({ required }) => required ? `"*"` : ''};
        color: red;
    }
`;

function FormFieldBase(props) {
    const { className, label, component, required, ...rest } = props;
    return (
        <div className={className}>
            <Label required={required}>{label}</Label>
            {createElement(component, rest)}
        </div>
    );
}

export const FormField = styled(FormFieldBase)`
    padding: 8px;
`;