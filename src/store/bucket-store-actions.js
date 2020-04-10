import { createContext, useContext } from 'react';

const BucketStoreActionContext = createContext({
    addItem(itemInfo) { },
    editItem(itemInfo) { },
    moveItem(itemId, targetBucketName) { },
    removeItem(itemId) { },
    updateItem(itemInfo) { }
});

export const BucketStoreActionProvider = BucketStoreActionContext.Provider;

export const useBucketStoreActions = () => useContext(BucketStoreActionContext);