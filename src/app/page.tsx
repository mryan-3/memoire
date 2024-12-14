'use client'

import { useState } from 'react'
import { Dock } from '@/components/toolbar-dock'
import { StickyNote } from '@/components/sticky-note'
import { VoiceRecorder } from '@/components/voice-recorder'
import { MusicPlayer } from '@/components/music-player'
import { ImageUploadDialog } from '@/components/image-upload-dialog'
import { PolaroidImage } from '@/components/polaroid-image'
import { DoodleDialog } from '@/components/doodle-dialog'
import type { Memory, MemoryType, ImageMemory } from '@/types/memory'

export default function MemoryBoard() {
  const [memories, setMemories] = useState<Memory[]>([])

  const handleAddMemory = (type: MemoryType) => {
    const newMemory: Memory = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      position: {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
      },
    }

    setMemories([...memories, newMemory])
  }

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    const newImageMemory: ImageMemory = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'image',
      content: '',
      position: {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
      },
      imageUrl,
      caption: '',
    }
    setMemories([...memories, newImageMemory])
  }

  const handleDoodleComplete = (imageUrl: string) => {
    const newDoodleMemory: ImageMemory = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'image',
      content: '',
      position: {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
      },
      imageUrl,
      caption: 'My Doodle',
    }
    setMemories([...memories, newDoodleMemory])
  }

  const renderMemory = (memory: Memory | ImageMemory) => {
    switch (memory.type) {
      case 'note':
        return <StickyNote key={memory.id} initialPosition={memory.position} />
      case 'voice':
        return (
          <VoiceRecorder key={memory.id} initialPosition={memory.position} />
        )
      case 'image':
        return (
          <PolaroidImage
            key={memory.id}
            initialPosition={memory.position}
            imageUrl={(memory as ImageMemory).imageUrl}
            initialCaption={(memory as ImageMemory).caption}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 overflow-hidden'>
      {memories.map(renderMemory)}
      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-4'>
        <div className='flex gap-6 '>
          <ImageUploadDialog onImageUpload={handleImageUpload} />
          <DoodleDialog onDoodleComplete={handleDoodleComplete} />
          <Dock onAddMemory={handleAddMemory} />
        </div>
      </div>
    </div>
  )
}
