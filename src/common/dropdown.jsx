import React, { useCallback } from 'react';
import styled from 'styled-components';

function DropdownBase(props) {
    const { onValueChange, items = [], ...rest } = props;
    const _onChange = useCallback((ev) => onValueChange(ev.target.value), [onValueChange]);
    const _renderOption = useCallback((i) => <option value={i}>{i}</option>, []);
    return (
        <select {...rest} onChange={_onChange}>
            <option value="__select">Select an option</option>
            {items.map(_renderOption)}
        </select>
    );
}

export const Dropdown = styled(DropdownBase)`
    width: 100%;
    height: 30px;
    border-radius: 3px;
`;