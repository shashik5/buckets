import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useBucketStore, BucketStoreActionProvider } from './store';
import { BucketList } from './bucket-list';
import { INITIALDATA, BUCKET_NAMES } from './constants';
import { EditorForm } from './editor-form';

const Title = styled.h3`
  padding-left: 16px;
  text-decoration: underline;
`;

function AppBase(props) {
  const { data, addItem, removeItem, updateItem, moveItem } = useBucketStore(INITIALDATA, BUCKET_NAMES);
  const [itemToEdit, setItemToEdit] = useState();

  const _onClose = useCallback(() => {
    setItemToEdit();
  }, []);

  const _onAddItem = useCallback((bucketName) => setItemToEdit({ bucketName }), []);

  return (
    <BucketStoreActionProvider value={{ addItem, removeItem, updateItem, moveItem, editItem: setItemToEdit }}>
      <div className={props.className}>
        <Title>Todo Buckets App</Title>
        <BucketList onAdd={_onAddItem} buckets={data} bucketNames={BUCKET_NAMES} />
        {itemToEdit ? <EditorForm onCancel={_onClose} onAdd={addItem} onUpdate={updateItem} initialValues={itemToEdit} /> : null}
      </div>
    </BucketStoreActionProvider>
  );
}



export default styled(AppBase)`
  padding: 5px 25px;
  box-sizing: border-box;
  height: 100%;
  background-color: #f8f8f8;
`;
