'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useDraggable } from '../hooks/use-draggable'
import type { Position } from '../types/memory'

interface StickyNoteProps {
  initialPosition: Position
  initialContent?: string
}

export function StickyNote({
  initialPosition,
  initialContent = '',
}: StickyNoteProps) {
  const [content, setContent] = useState(initialContent)
  const {
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDraggable(initialPosition)
  const rotation = Math.random() * 10 - 5 // Random slight rotation

  return (
    <div
      className='absolute cursor-move'
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation}deg)`,
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
      onMouseUp={handleMouseUp}
    >
      <div className='w-48 h-48 bg-yellow-100 p-4 shadow-lg rounded-sm'>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='w-full h-full bg-transparent border-none resize-none font-handwriting text-gray-700 focus:ring-0'
          placeholder='Write your note...'
          style={{ fontFamily: 'Indie Flower, cursive' }}
        />
      </div>
    </div>
  )
}
