import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BucketItem } from './bucket-item';
import { useBucketStoreActions } from '../../store';
import { Droppable } from '../../drag-drop';

const ItemsWrapper = styled.div`
    overflow: auto;
    max-height: 600px;
    min-height: 300px;
    margin-top: 8px;
    position: relative;
`;

const BucketWrapper = styled(Droppable)`
    width: 300px;
    box-shadow: 0px 0px 2px 1px #e0e0e0;
    padding: 8px;
    background-color: #f0f0f0;
    border-radius: 3px;
`;

const CenteredLabel = styled.label`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const AddButton = styled.label`
    text-decoration: underline;
    color: #478cff;
    margin-left: 5px;
    font-size: 14px;
    cursor: pointer;
`;

export function Bucket(props) {
    const { className, items, name, onAdd } = props;
    const { moveItem } = useBucketStoreActions();

    const _onDrop = useCallback((itemId) => moveItem(itemId, name), [moveItem, name]);
    const _onAddClick = useCallback(() => onAdd(name), [name, onAdd]);

    const _onRenderItem = React.useCallback((item) => <BucketItem {...item} key={item.title} />, []);

    return (
        <BucketWrapper className={className} onDrop={_onDrop} type="item_id" message="Drop here to move...">
            <label>{name}</label>
            <ItemsWrapper>
                {items.map(_onRenderItem)}
                {items.length === 0 ? <CenteredLabel>No Items to Display</CenteredLabel> : null}
            </ItemsWrapper>
            <AddButton onClick={_onAddClick}>Create Item</AddButton>
        </BucketWrapper>
    );
}