'use client'

import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Camera, Image, Upload } from 'lucide-react'

interface ImageUploadDialogProps {
  onImageUpload: (file: File) => void
}

export function ImageUploadDialog({ onImageUpload }: ImageUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImageUpload(file)
      setIsOpen(false)
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      await video.play()

      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', {
            type: 'image/jpeg',
          })
          onImageUpload(file)
          setIsOpen(false)
        }
      }, 'image/jpeg')

      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
            <Image className=' h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-sky-500 w-60'>
        <DialogHeader>
          <DialogTitle>
            <Label>Add Image</Label>
          </DialogTitle>
        </DialogHeader>
        <div className='flex w-full  items-center justify-center gap-4 py-4'>
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className=' h-4 w-4' />
          </Button>
          <Input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileUpload}
          />
          <Button onClick={handleCameraCapture}>
            <Camera className=' h-4 w-4' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
