import { createContext, useContext } from 'react';

export const DNDContext = createContext({
    isZoneDroppable(zoneId) { },
    setCurrentlyDraggedZoneId(zoneId) { }
});

export const useDNDContext = () => useContext(DNDContext);

export const DropContext = createContext({
    zoneId: ''
});

export const useDropContext = () => useContext(DropContext);