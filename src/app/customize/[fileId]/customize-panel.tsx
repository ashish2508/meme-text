"use client"
import { urlEndpoint } from "@/app/providers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState, useRef, useCallback, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, 'filePath' | 'name'>
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");
  const [textPosition, setTextPosition] = useState<Position>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!textRef.current) return;

    setIsDragging(true);
    const rect = textRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !imageContainerRef.current || !textRef.current) return;

    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    // Calculate new position
    let newX = e.clientX - containerRect.left - dragOffset.x;
    let newY = e.clientY - containerRect.top - dragOffset.y;

    // Boundary constraints
    const maxX = containerRect.width - textRect.width;
    const maxY = containerRect.height - textRect.height;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setTextPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Attach global mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="grid grid-cols-2 gap-8">
      <form action="" className="w-fit gap-4">
        <Label htmlFor="textOverlay1">Text overlay 1</Label>
        <Input
          id="textOverlay1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextOverlay1(e.target.value)}
          value={textOverlay1}
          placeholder="Enter text to overlay"
        />
      </form>

      {/* Image container with relative positioning */}
      <div
        ref={imageContainerRef}
        className="relative inline-block"
        style={{ width: 300, height: 300 }}
      >
        <IKImage
          path={file.filePath}
          urlEndpoint={urlEndpoint}
          alt={file.name}
          width={300}
          height={300}
          className="select-none"
        />
    
        {/* Draggable text overlay */}
        {textOverlay1 && (
          <div
            ref={textRef}
            className="absolute cursor-move select-none bg-black/20 text-white px-2 py-1 rounded font-bold text-lg"
            style={{
              left: textPosition.x,
              top: textPosition.y,
              userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
          >
            {textOverlay1}
          </div>
        )}
      </div>
    </div>
  );
}
