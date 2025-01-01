'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DoodleDialogProps {
  onDoodleComplete: (imageUrl: string) => void;
}

export function DoodleDialog({ onDoodleComplete }: DoodleDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [size, setSize] = useState(5)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        setContext(ctx)
      }
    }
  }, [])

  useEffect(() => {
    if (context) {
      context.strokeStyle = color
      context.lineWidth = size
    }
  }, [context, color, size])

  const startDrawing = (e: React.MouseEvent) => {
    if (context) {
      setIsDrawing(true)
      draw(e)
    }
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.lineTo(x, y)
    context.stroke()
    context.beginPath()
    context.moveTo(x, y)
  }

  const stopDrawing = () => {
    if (context) {
      setIsDrawing(false)
      context.beginPath()
    }
  }

  const handleComplete = () => {
    if (canvasRef.current) {
      const imageUrl = canvasRef.current.toDataURL()
      onDoodleComplete(imageUrl)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Doodle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Doodle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            className="border border-gray-200 rounded"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <div className="flex items-center gap-4">
            <Label htmlFor="color">Color:</Label>
            happy new year
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-8"
            />
            <Label htmlFor="size">Size:</Label>
            <Input
              id="size"
              type="range"
              min="1"
              max="20"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-32"
            />
          </div>
          <Button onClick={handleComplete}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


