import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Draggable } from '../../drag-drop';
import { useBucketStoreActions } from '../../store';

const Label = styled.label`
    font-size: 15px;
    font-weight: 600;
    color: white;
    max-width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const EditButton = styled.span`
    display: none;
    cursor: pointer;
    height: 12px;
    width: 12px;
    background-image: url('/images/edit.svg');
    background-repeat: no-repeat;
    background-size: contain;
`;

const DeleteButton = styled(EditButton)`
    background-image: url('/images/delete.svg');
    margin-left: 8px;
`;

const ItemWrapper = styled(Draggable)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    margin-bottom: 8px;
    background-color: #478cff;
    min-height: 30px;
    border-radius: 3px;
    &:hover {
        .edit-button, .delete-button {
            display: inline-block;
        }
    }
`;

export function BucketItem(props) {
    const { className, title, id, bucketName } = props;
    const { editItem, removeItem } = useBucketStoreActions();
    const _onEditItem = useCallback(() => editItem({ title, id, bucketName }), [title, id, bucketName, editItem]);
    const _onDeleteItem = useCallback(() => removeItem(id), [id, removeItem]);
    return (
        <ItemWrapper className={className} type="item_id" dropEffect="move" data={id}>
            <Label title={title}>{title}</Label>
            <div>
                <EditButton className="edit-button" onClick={_onEditItem} title="Edit" />
                <DeleteButton className="delete-button" onClick={_onDeleteItem} title="Delete" />
            </div>
        </ItemWrapper>
    );
}