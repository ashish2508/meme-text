"use client"
import { urlEndpoint } from "@/app/providers";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDraggable } from "@/hooks/useDraggable";
import type { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, 'filePath' | 'name'>
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");

  const {
    position,
    containerRef,
    elementRef,
    handleMouseDown,
    handleTouchStart, 
  } = useDraggable({ initialPosition: { x: 50, y: 50 } });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
      <form
        action=""
        className="w-full lg:w-fit gap-4 space-y-4" 
        onSubmit={(e) => e.preventDefault()}
      >
        <Label htmlFor="textOverlay1">Text to add</Label>
        <Textarea
          id="textOverlay1"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextOverlay1(e.target.value)}
          value={textOverlay1}
          placeholder="Enter text to overlay"
          className="flex w-full lg:w-fit rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none scrollbar-hide" 
          rows={1}
        />
      </form>

      <div
        ref={containerRef}
        className="relative inline-block overflow-hidden mx-auto lg:mx-0"
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

        {textOverlay1 && (
          <div
            ref={elementRef}
            className="absolute cursor-grab active:cursor-grabbing select-none bg-transparent text-black font-semibold px-2 py-1 rounded font-bold text-lg whitespace-pre-wrap touch-none"
            style={{
              left: position.x,
              top: position.y,
              userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart} 
          >
            {textOverlay1}
          </div>
        )}
      </div>
    </div>
  );
}
