import React, { useState, useCallback, useMemo } from 'react';
import { DNDContext } from './context';

export function DNDProvider(props) {
    const [draggingZoneId, setDraggingZoneId] = useState('');
    const isZoneDroppable = useCallback((zoneId) => (draggingZoneId && zoneId !== draggingZoneId), [draggingZoneId]);
    const value = useMemo(() => ({ isZoneDroppable, setCurrentlyDraggedZoneId: setDraggingZoneId }), [isZoneDroppable]);
    return (
        <DNDContext.Provider value={value}>
            {props.children}
        </DNDContext.Provider>
    );
}