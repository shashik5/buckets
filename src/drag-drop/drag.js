import { useState, useEffect, useCallback } from 'react';
import { useDNDContext } from './context';

export function useDrag(options) {
    const { type = '', dropEffect = 'copy', data, originZoneId } = options;
    const [dragElement, setDragRef] = useState(null);
    const [isDragging, setDraggingState] = useState(false);
    const { setCurrentlyDraggedZoneId } = useDNDContext();

    const _onDragStart = useCallback((ev) => {
        const { dataTransfer } = ev;
        dataTransfer.dropEffect = dropEffect;
        dataTransfer.setData(type, data);
        setCurrentlyDraggedZoneId(originZoneId);
        setDraggingState(true);
    }, [dropEffect, type, data, originZoneId, setCurrentlyDraggedZoneId]);

    const _onDragEnd = useCallback(() => {
        setDraggingState(false);
        setCurrentlyDraggedZoneId('');
    }, [setCurrentlyDraggedZoneId]);

    useEffect(() => {
        if (!dragElement) {
            return;
        }
        dragElement.addEventListener('dragstart', _onDragStart);
        dragElement.addEventListener('dragend', _onDragEnd);
        return () => {
            dragElement.removeEventListener('dragstart', _onDragStart);
            dragElement.removeEventListener('dragend', _onDragEnd);
        };
    }, [dragElement, _onDragStart, _onDragEnd]);

    return { setDragRef, isDragging };
}