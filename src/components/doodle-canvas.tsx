'use client'

import { useRef, useState, useEffect } from 'react'
import { useDraggable } from '../hooks/use-draggable'
import type { Position } from '../types/memory'

interface DoodleCanvasProps {
  initialPosition: Position
}

export function DoodleCanvas({ initialPosition }: DoodleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const { position, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(initialPosition)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.strokeStyle = '#FF6B6B'
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        setContext(ctx)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent) => {
    if (!isDragging && context) {
      setIsDrawing(true)
      const rect = canvasRef.current!.getBoundingClientRect()
      context.beginPath()
      context.moveTo(
        e.clientX - rect.left,
        e.clientY - rect.top
      )
    }
  }

  const draw = (e: React.MouseEvent) => {
    if (isDrawing && !isDragging && context) {
      const rect = canvasRef.current!.getBoundingClientRect()
      context.lineTo(
        e.clientX - rect.left,
        e.clientY - rect.top
      )
      context.stroke()
    }
  }

  const stopDrawing = () => {
    if (context) {
      setIsDrawing(false)
      context.closePath()
    }
  }

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 1,
      }}
    >
      <div
        className="w-64 h-64 bg-white rounded-sm shadow-lg p-2"
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          if (isDragging) {
            handleMouseMove(e as unknown as MouseEvent)
          } else {
            draw(e)
          }
        }}
        onMouseUp={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={240}
          height={240}
          className="border border-gray-200 rounded"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  )
}


