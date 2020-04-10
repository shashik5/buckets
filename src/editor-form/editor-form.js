import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Modal, Input, Dropdown, FormField } from '../common';
import { BUCKET_NAMES } from '../constants';

const ButtonsContainer = styled.div`
    margin-top: 8px;
    float: right;
`;

const Button = styled.input.attrs(() => ({
    type: 'button'
}))`
    height: 30px;
    background-color: #478cff;
    border: none;
    width: 80px;
    color: white;
    margin-right: 8px;
    border-radius: 3px;
`;

const Header = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
`;

const ErrorMessage = styled.div`
    font-size: 15px;
    margin-bottom: 8px;
    padding-left: 8px;
    color: red;
`;

const stopPropagation = (ev) => ev.stopPropagation();

function EditorFormBase(props) {
    const { className, initialValues = {}, onCancel, onAdd, onUpdate } = props;
    const inEditMode = !!initialValues.id;
    const [title, setTitle] = useState(initialValues.title);
    const [bucketName, setBucketName] = useState(initialValues.bucketName);
    const [error, setError] = useState();

    const _onSave = useCallback(() => {
        if (!title || !bucketName || bucketName === '__select') {
            setError('All fields are mandatory!!!');
            return;
        }
        const data = {
            title,
            bucketName
        };
        if (inEditMode && typeof onUpdate === 'function') {
            onUpdate({ ...data, id: initialValues.id });
        } else if (typeof onAdd === 'function') {
            onAdd(data);
        }
        if (typeof onCancel === 'function') {
            onCancel();
        }
    }, [title, bucketName, onUpdate, onAdd, inEditMode, initialValues.id, onCancel]);

    return (
        <Modal onClick={onCancel}>
            <div className={className} onClick={stopPropagation}>
                <Header>{inEditMode ? 'Update Item' : 'Add Item'}</Header>
                <FormField label="Title" component={Input} value={title} placeholder="Enter Label" onValueChange={setTitle} required />
                <FormField label="Bucket" component={Dropdown} items={BUCKET_NAMES} value={bucketName} placeholder="Select Bucket" onValueChange={setBucketName} required />
                <ErrorMessage hidden={!error}>{error}</ErrorMessage>
                <ButtonsContainer>
                    <Button onClick={onCancel} value="Cancel" />
                    <Button onClick={_onSave} value={inEditMode ? 'Update' : 'Add'} />
                </ButtonsContainer>
            </div>
        </Modal>
    );
}

export const EditorForm = styled(EditorFormBase)`
    padding: 15px;
    border-radius: 3px;
    background-color: white;
    width: 30%;
`;