'use client'

import { StickyNoteIcon, Mic, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MemoryType } from '@/types/memory'

interface DockProps {
  onAddMemory: (type: MemoryType) => void
}

export function Dock({ onAddMemory }: DockProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-pink-100"
        onClick={() => onAddMemory('note')}
      >
        <StickyNoteIcon className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-blue-100"
        onClick={() => onAddMemory('voice')}
      >
        <Mic className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-purple-100"
        onClick={() => onAddMemory('music')}
      >
        <Music className="h-6 w-6" />
      </Button>
    </>
  )
}


