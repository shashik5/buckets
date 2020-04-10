import { useReducer, useCallback, useMemo } from 'react';
import { v1 } from 'uuid';

function storeReducer(state, payload) {
    const { data, action } = payload;
    switch (action) {
        case 'ADD': {
            if (typeof data !== 'object') {
                return state;
            }
            return [{ ...data, id: v1() }, ...state];
        }
        case 'REMOVE': {
            if (typeof data !== 'string') {
                return state;
            }
            return state.filter(i => i.id !== data);
        }
        case 'UPDATE': {
            const itemIdx = state.findIndex(i => i.id === data.id);
            if (itemIdx > -1) {
                return [...state.slice(0, itemIdx), data, ...state.slice(itemIdx + 1)];
            }
            return state;
        }
        case 'MOVE': {
            const { itemId, targetBucketName } = data;
            const itemIdx = state.findIndex(i => i.id === itemId);
            if ((itemIdx > -1) && targetBucketName) {
                const item = state[itemIdx];
                item.bucketName = targetBucketName;
                return [...state.slice(0, itemIdx), item, ...state.slice(itemIdx + 1)];
            }
            return state;
        }
        default: return state;
    }
}

function itemsGenerator(res, item) {
    const { bucketName } = item;
    if (!(bucketName in res)) {
        res[bucketName] = [];
    }
    res[bucketName].push(item);
    return res;
}

function initialBucketStructureReducer(res, bucketName) {
    res[bucketName] = [];
    return res;
}

export function useBucketStore(initialStoreData = [], defaultBucketNames = []) {
    const [list, dispatch] = useReducer(storeReducer, initialStoreData);

    const addItem = useCallback((itemInfo) => dispatch({
        action: 'ADD',
        data: itemInfo
    }), []);

    const removeItem = useCallback((itemId) => dispatch({
        action: 'REMOVE',
        data: itemId
    }), []);

    const updateItem = useCallback((itemInfo) => dispatch({
        action: 'UPDATE',
        data: itemInfo
    }), []);

    const moveItem = useCallback((itemId, targetBucketName) => dispatch({
        action: 'MOVE',
        data: { itemId, targetBucketName }
    }), []);

    const data = useMemo(() => list.reduce(itemsGenerator, defaultBucketNames.reduce(initialBucketStructureReducer, {})), [list, defaultBucketNames]);

    return { data, addItem, removeItem, updateItem, moveItem };
}