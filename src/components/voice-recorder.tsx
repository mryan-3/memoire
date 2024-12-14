'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Square, Play, Pause } from 'lucide-react'
import { useDraggable } from '../hooks/use-draggable'
import type { Position } from '../types/memory'

interface VoiceRecorderProps {
  initialPosition: Position
}

export function VoiceRecorder({ initialPosition }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const {
    position,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDraggable(initialPosition)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        setAudioUrl(URL.createObjectURL(blob))
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const togglePlayback = () => {
    if (audioRef.current && audioUrl) {
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
      className='absolute cursor-move'
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
      onMouseUp={handleMouseUp}
    >
      <div className='bg-pink-50 p-4 rounded-full shadow-lg'>
        {!audioUrl ? (
          <Button
            variant='ghost'
            size='icon'
            className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <Square className='h-4 w-4' />
            ) : (
              <Mic className='h-4 w-4' />
            )}
          </Button>
        ) : (
          <>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-full'
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className='h-4 w-4' />
              ) : (
                <Play className='h-4 w-4' />
              )}
            </Button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
            />
          </>
        )}
      </div>
    </div>
  )
}
