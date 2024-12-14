'use client'

import { useState } from 'react'
import { useDraggable } from '../hooks/use-draggable'
import { Input } from "@/components/ui/input"
import type { Position } from '../types/memory'

interface PolaroidImageProps {
  initialPosition: Position
  imageUrl: string
  initialCaption?: string
}

export function PolaroidImage({ initialPosition, imageUrl, initialCaption = '' }: PolaroidImageProps) {
  const [caption, setCaption] = useState(initialCaption)
  const { position, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(initialPosition)

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
      onMouseUp={handleMouseUp}
    >
      <div className="bg-white p-4 shadow-lg rounded-sm w-64">
        <img src={imageUrl} alt="Uploaded memory" className="w-full h-48 object-cover mb-4" />
        <Input
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full text-center font-handwriting"
        />
      </div>
      {/* remove the image */}
      <div onClick={() => handleMouseUp()} className="absolute top-2 right-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
}


