import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Bucket } from './bucket';
import { DNDProvider } from '../drag-drop';

function BucketListBase(props) {
    const { className, buckets = {}, bucketNames = [], onAdd } = props;
    const _onRenderBucket = useCallback((bucketName) => <Bucket onAdd={onAdd} name={bucketName} items={buckets[bucketName]} key={bucketName} />, [buckets, onAdd]);
    return (
        <DNDProvider>
            <div className={className}>
                {bucketNames.map(_onRenderBucket)}
            </div>
        </DNDProvider>
    );
}

export const BucketList = styled(BucketListBase)`
    display: flex;
    justify-content: space-evenly;
`;