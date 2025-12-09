'use client'

import { useRef, useEffect, useState } from 'react'
import * as fabric from 'fabric'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Square,
    Circle,
    Type,
    Minus,
    MousePointer,
    Download
} from 'lucide-react'

// Paper size presets (in pixels at 96 DPI)
const PAPER_SIZES = {
    A4: { width: 794, height: 1123 }, // 210 x 297 mm
    F4: { width: 816, height: 1056 }, // 210 x 276 mm
    Letter: { width: 816, height: 1056 }, // 8.5 x 11 in
    Legal: { width: 816, height: 1344 }, // 8.5 x 14 in
    A3: { width: 1123, height: 1587 }, // 297 x 420 mm
} as const

type PaperSize = keyof typeof PAPER_SIZES
type Tool = 'select' | 'rectangle' | 'circle' | 'text' | 'line'

export function CanvasEditor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
    const [activeTool, setActiveTool] = useState<Tool>('select')
    const [selectedPaperSize, setSelectedPaperSize] = useState<PaperSize>('A4')
    const [isLoading, setIsLoading] = useState(true)

    // Initialize Fabric.js canvas
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: PAPER_SIZES[selectedPaperSize].width,
            height: PAPER_SIZES[selectedPaperSize].height,
            backgroundColor: 'white',
            selection: true,
            preserveObjectStacking: true,
        })

        fabricCanvasRef.current = canvas
        setIsLoading(false)

        // Set up event handlers
        canvas.on('selection:created', handleSelection)
        canvas.on('selection:updated', handleSelection)
        canvas.on('selection:cleared', () => {
            // Clear properties panel when nothing is selected
        })

        // Cleanup
        return () => {
            canvas.dispose()
        }
    }, [selectedPaperSize])

    const handleSelection = (e: { selected?: fabric.Object[] }) => {
        // Handle object selection for properties panel
        console.log('Selected object:', e.selected)
    }

    // Tool selection handlers
    const handleToolSelect = (tool: Tool) => {
        setActiveTool(tool)

        if (!fabricCanvasRef.current) return

        // Enable/disable drawing modes based on tool
        switch (tool) {
            case 'select':
                fabricCanvasRef.current.isDrawingMode = false
                fabricCanvasRef.current.selection = true
                break
            case 'rectangle':
                fabricCanvasRef.current.isDrawingMode = false
                fabricCanvasRef.current.selection = false
                break
            case 'circle':
                fabricCanvasRef.current.isDrawingMode = false
                fabricCanvasRef.current.selection = false
                break
            case 'text':
                fabricCanvasRef.current.isDrawingMode = false
                fabricCanvasRef.current.selection = false
                break
            case 'line':
                fabricCanvasRef.current.isDrawingMode = false
                fabricCanvasRef.current.selection = false
                break
        }
    }

    // Add shape handlers
    const addRectangle = () => {
        if (!fabricCanvasRef.current) return

        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 60,
            fill: '#3B82F6',
            stroke: '#1E40AF',
            strokeWidth: 2,
        })

        fabricCanvasRef.current.add(rect)
        fabricCanvasRef.current.setActiveObject(rect)
        fabricCanvasRef.current.renderAll()
    }

    const addCircle = () => {
        if (!fabricCanvasRef.current) return

        const circle = new fabric.Circle({
            left: 150,
            top: 150,
            radius: 50,
            fill: '#10B981',
            stroke: '#059669',
            strokeWidth: 2,
        })

        fabricCanvasRef.current.add(circle)
        fabricCanvasRef.current.setActiveObject(circle)
        fabricCanvasRef.current.renderAll()
    }

    const addText = () => {
        if (!fabricCanvasRef.current) return

        const text = new fabric.Text('Sample Text', {
            left: 200,
            top: 200,
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#1F2937',
        })

        fabricCanvasRef.current.add(text)
        fabricCanvasRef.current.setActiveObject(text)
        fabricCanvasRef.current.renderAll()
    }

    const addLine = () => {
        if (!fabricCanvasRef.current) return

        const line = new fabric.Line([100, 100, 200, 100], {
            stroke: '#EF4444',
            strokeWidth: 3,
        })

        fabricCanvasRef.current.add(line)
        fabricCanvasRef.current.setActiveObject(line)
        fabricCanvasRef.current.renderAll()
    }

    // Export to PDF
    const exportToPDF = async () => {
        if (!fabricCanvasRef.current) return

        try {
            // Convert canvas to data URL
            const dataURL = fabricCanvasRef.current.toDataURL({
                multiplier: 1,
                format: 'png',
                quality: 1,
            })

            // Create download link
            const link = document.createElement('a')
            link.download = `quarantine-label-${Date.now()}.png`
            link.href = dataURL
            link.click()
        } catch (error) {
            console.error('Export failed:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading canvas...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-200px)]">
            {/* Toolbar */}
            <div className="p-4 w-full lg:w-64 flex-shrink-0 bg-white border rounded-lg shadow-sm">
                <div className="space-y-4">
                    {/* Paper Size Selection */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Paper Size
                        </label>
                        <select
                            value={selectedPaperSize}
                            onChange={(e) => setSelectedPaperSize(e.target.value as PaperSize)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Object.keys(PAPER_SIZES).map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Separator />

                    {/* Tools */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Tools
                        </label>
                        <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                            <Button
                                variant={activeTool === 'select' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleToolSelect('select')}
                                className="flex flex-col items-center gap-1 h-auto py-2"
                            >
                                <MousePointer className="h-4 w-4" />
                                <span className="text-xs">Select</span>
                            </Button>

                            <Button
                                variant={activeTool === 'rectangle' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    handleToolSelect('rectangle')
                                    addRectangle()
                                }}
                                className="flex flex-col items-center gap-1 h-auto py-2"
                            >
                                <Square className="h-4 w-4" />
                                <span className="text-xs">Rectangle</span>
                            </Button>

                            <Button
                                variant={activeTool === 'circle' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    handleToolSelect('circle')
                                    addCircle()
                                }}
                                className="flex flex-col items-center gap-1 h-auto py-2"
                            >
                                <Circle className="h-4 w-4" />
                                <span className="text-xs">Circle</span>
                            </Button>

                            <Button
                                variant={activeTool === 'text' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    handleToolSelect('text')
                                    addText()
                                }}
                                className="flex flex-col items-center gap-1 h-auto py-2"
                            >
                                <Type className="h-4 w-4" />
                                <span className="text-xs">Text</span>
                            </Button>

                            <Button
                                variant={activeTool === 'line' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    handleToolSelect('line')
                                    addLine()
                                }}
                                className="flex flex-col items-center gap-1 h-auto py-2"
                            >
                                <Minus className="h-4 w-4" />
                                <span className="text-xs">Line</span>
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Actions
                        </label>
                        <div className="space-y-2">
                            <Button
                                onClick={exportToPDF}
                                className="w-full flex items-center gap-2"
                                size="sm"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 p-4 overflow-auto bg-white border rounded-lg shadow-sm">
                <div className="flex justify-center items-center min-h-full">
                    <div
                        className="border border-gray-300 shadow-lg bg-white"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            overflow: 'auto'
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            className="block"
                            style={{
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}