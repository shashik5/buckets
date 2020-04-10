import React, { } from 'react';
import styled from 'styled-components';
import { useDrag } from './drag';
import { useDropContext } from './context';

const Wrapper = styled.div`
    opacity: ${({ isdragging }) => isdragging ? 0.2 : 1};
`;

export function Draggable(props) {
    const { className, type = '', dropEffect = 'copy', data, children } = props;
    const { zoneId } = useDropContext();
    const { isDragging, setDragRef } = useDrag({
        type, dropEffect, data, originZoneId: zoneId
    });
    return (
        <Wrapper className={className} draggable isdragging={isDragging} ref={setDragRef}>
            {children}
        </Wrapper>
    );
}