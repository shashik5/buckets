import { useCallback, useState, useEffect, useMemo } from 'react';
import { v1 } from 'uuid';
import { useDNDContext } from './context';

export function useDrop(options) {
    const { type = '', onDrop } = options;
    const [dropTarget, setDropTarget] = useState(null);
    const zoneId = useMemo(() => v1(), []);
    const { setCurrentlyDraggedZoneId } = useDNDContext();

    const _onDragOver = useCallback((ev) => {
        const types = ev.dataTransfer.types;
        if (types.includes(type)) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = 'move';
        }
    }, [type]);

    const _onDrop = useCallback((ev) => {
        const data = ev.dataTransfer.getData(type);
        if (typeof onDrop === 'function') {
            onDrop(data);
        }
        setCurrentlyDraggedZoneId('');
    }, [onDrop, type, setCurrentlyDraggedZoneId]);

    useEffect(() => {
        if (!dropTarget) {
            return;
        }
        dropTarget.addEventListener('dragover', _onDragOver);
        dropTarget.addEventListener('drop', _onDrop);
        return () => {
            dropTarget.removeEventListener('drop', _onDrop);
            dropTarget.removeEventListener('dragover', _onDragOver);
        };
    }, [dropTarget, _onDragOver, _onDrop]);

    return { setDropTarget, zoneId };
}