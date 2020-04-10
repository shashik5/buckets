import React, { useCallback } from 'react';
import styled from 'styled-components';

function InputBase(props) {
    const { onValueChange, ...rest } = props;
    const _onChange = useCallback((ev) => onValueChange(ev.target.value), [onValueChange]);
    return <input {...rest} onChange={_onChange} />;
}

export const Input = styled(InputBase)`
    width: 100%;
    height: 30px;
    border-radius: 3px;
    padding-left: 8px;
`;