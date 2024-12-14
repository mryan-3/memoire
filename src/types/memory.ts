export type MemoryType = 'photo' | 'note' | 'voice' | 'music' | 'doodle' | 'image';

export interface Position {
  x: number;
  y: number;
}

export interface Memory {
  id: string;
  type: MemoryType;
  content: string;
  position: Position;
  rotation?: number;
}

export interface ImageMemory extends Memory {
    type: 'image';
    imageUrl: string
    caption: string
}
