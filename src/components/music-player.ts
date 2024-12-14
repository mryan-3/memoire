'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play, Pause } from 'lucide-react'
import { useDraggable } from '../hooks/use-draggable'
import type { Position } from '../types/memory'

interface MusicPlayerProps {
  initialPosition: Position
}

export function MusicPlayer({ initialPosition }: MusicPlayerProps) {
  const [url, setUrl] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { position, isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(initialPosition)

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audioRef.current)
    source.connect(analyser)
    analyser.connect(audioContext.destination)

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')!

    function renderFrame() {
      requestAnimationFrame(renderFrame)
      analyser.getByteFrequencyData(dataArray)

      canvasCtx.fillStyle = 'rgb(255, 255, 255)'
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2

        canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    renderFrame()

    return () => {
      source.disconnect()
      analyser.disconnect()
    }
  }, [])

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
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
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
      onMouseUp={handleMouseUp}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <Input
          type="text"
          placeholder="Enter song URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mb-2"
        />
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={togglePlayback}
            disabled={!url}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <audio ref={audioRef} src={url} />
        </div>
        <canvas ref={canvasRef} width={220} height={50} className="w-full" />
      </div>
    </div>
  )
}


