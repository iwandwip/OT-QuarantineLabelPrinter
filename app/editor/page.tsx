'use client'

import { CanvasEditor } from '@/components/canvas-editor/CanvasEditor'

export default function EditorPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Quarantine Label Editor</h1>
                    <p className="text-gray-600 mt-2">
                        Create professional quarantine labels with drag-and-drop tools
                    </p>
                </div>
                <CanvasEditor />
            </div>
        </div>
    )
}