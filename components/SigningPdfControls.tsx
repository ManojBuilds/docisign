"use client"

import {
    ZoomIn, ZoomOut,
    ChevronLeft, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SigningPdfControlsProps {
    pageNumber: number
    numPages: number
    scale: number
    onPageChange: (page: number) => void
    onScaleChange: (scale: number) => void
}

export default function SigningPdfControls({
    pageNumber,
    numPages,
    scale,
    onPageChange,
    onScaleChange,
}: SigningPdfControlsProps) {
    const goToPrevPage = () => {
        if (pageNumber > 1) {
            onPageChange(pageNumber - 1)
        }
    }

    const goToNextPage = () => {
        if (pageNumber < numPages) {
            onPageChange(pageNumber + 1)
        }
    }

    const zoomIn = () => {
        onScaleChange(Math.min(scale + 0.2, 2.0))
    }

    const zoomOut = () => {
        onScaleChange(Math.max(scale - 0.2, 0.5))
    }

    const resetZoom = () => {
        onScaleChange(1.0)
    }

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Page Navigation */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className={`${pageNumber <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-accent'}`}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm select-none">
                    {pageNumber} / {numPages}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className={`${pageNumber >= numPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-accent'}`}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                    className={`${scale <= 0.5 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-accent'}`}
                >
                    <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetZoom}
                    className="cursor-pointer hover:bg-accent"
                >
                    {Math.round(scale * 100)}%
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={zoomIn}
                    disabled={scale >= 2.0}
                    className={`${scale >= 2.0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-accent'}`}
                >
                    <ZoomIn className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
