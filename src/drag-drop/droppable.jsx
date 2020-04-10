import React, { useMemo } from 'react';
import styled from 'styled-components';
import { DropContext, useDNDContext } from './context';
import { useDrop } from './drop';
import { Modal } from '../common';

const Wrapper = styled.div`
    position: relative;
`;

export function Droppable(props) {
    const { className, onDrop, type = '', message = '' } = props;
    const { setDropTarget, zoneId } = useDrop({
        type, onDrop
    });
    const value = useMemo(() => ({ zoneId }), [zoneId]);
    const { isZoneDroppable } = useDNDContext();
    return (
        <DropContext.Provider value={value}>
            <Wrapper className={className} ref={setDropTarget}>
                {props.children}
                <Modal hidden={!isZoneDroppable(zoneId)}>{message}</Modal>
            </Wrapper>
        </DropContext.Provider>
    );
}