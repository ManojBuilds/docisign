'use client'
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface PdfDimensionsContextType {
    pageDimensions: Record<number, { width: number; height: number }>;
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
    setPageDimensions: React.Dispatch<React.SetStateAction<Record<number, { width: number; height: number; }>>>
}

const PdfDimensionsContext = createContext<PdfDimensionsContextType | undefined>(undefined);

export const PdfDimensionsProvider = ({ children }: { children: ReactNode }) => {
    const [pageDimensions, setPageDimensions] = useState<Record<number, { width: number; height: number }>>({});
    const [scale, setScale] = useState<number>(1);

    const value = useMemo(() => ({ pageDimensions, scale, setPageDimensions, setScale }), [pageDimensions, scale]);

    return (
        <PdfDimensionsContext.Provider value={value}>
            {children}
        </PdfDimensionsContext.Provider>
    );
};

export const usePdfDimensions = () => {
    const context = useContext(PdfDimensionsContext);
    if (!context) {
        throw new Error('usePdfDimensions must be used within a PdfDimensionsProvider');
    }
    return context;
};
