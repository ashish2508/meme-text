"use client"
import { urlEndpoint } from "@/app/providers";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDraggable } from "@/hooks/useDraggable";
import type { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, 'filePath' | 'name'>
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");
  const [textOverlay2, setTextOverlay2] = useState<string>("");
  const [textOverlay3, setTextOverlay3] = useState<string>("");
  const [textOverlay4, setTextOverlay4] = useState<string>("");

  const sharedContainerRef = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(false);
  const [sharpen, setSharpen] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const {
    position: position1,
    elementRef: elementRef1,
    handleMouseDown: handleMouseDown1,
    handleTouchStart: handleTouchStart1,
  } = useDraggable({
    initialPosition: { x: 50, y: 50 },
    containerRef: sharedContainerRef
  });

  const {
    position: position2,
    elementRef: elementRef2,
    handleMouseDown: handleMouseDown2,
    handleTouchStart: handleTouchStart2,
  } = useDraggable({
    initialPosition: { x: 100, y: 100 },
    containerRef: sharedContainerRef
  });

  const {
    position: position3,
    elementRef: elementRef3,
    handleMouseDown: handleMouseDown3,
    handleTouchStart: handleTouchStart3,
  } = useDraggable({
    initialPosition: { x: 150, y: 50 },
    containerRef: sharedContainerRef
  });

  const {
    position: position4,
    elementRef: elementRef4,
    handleMouseDown: handleMouseDown4,
    handleTouchStart: handleTouchStart4,
  } = useDraggable({
    initialPosition: { x: 200, y: 100 },
    containerRef: sharedContainerRef
  });

  return (
    <div className="space-y-6">
      <div>
        <Card className="p-4 space-y-4">
          <h2 className="text-xl">Effects</h2>

          <div className="flex gap-4">
            <div className="flex gap-2">
              <Checkbox
                checked={blur}
                onCheckedChange={(v) => {
                  setBlur(v as boolean);
                }}
                id="blur"
              />
              <label
                htmlFor="blur"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Blur
              </label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={sharpen}
                onCheckedChange={(v) => {
                  setSharpen(v as boolean);
                }}
                id="sharpen"
              />
              <label
                htmlFor="sharpen"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sharpen
              </label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={grayscale}
                onCheckedChange={(v) => {
                  setGrayscale(v as boolean);
                }}
                id="grayscale"
              />
              <label
                htmlFor="grayscale"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Grayscale
              </label>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <form
          action=""
          className="space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="textOverlay1">Text Overlay 1</Label>
          <Textarea
            id="textOverlay1"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextOverlay1(e.target.value)}
            value={textOverlay1}
            placeholder="Enter text for overlay 1"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none scrollbar-hide"
            rows={2}
          />
        </form>

        <form
          action=""
          className="space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="textOverlay2">Text Overlay 2</Label>
          <Textarea
            id="textOverlay2"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextOverlay2(e.target.value)}
            value={textOverlay2}
            placeholder="Enter text for overlay 2"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none scrollbar-hide"
            rows={2}
          />
        </form>

        <form
          action=""
          className="space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="textOverlay3">Text Overlay 3</Label>
          <Textarea
            id="textOverlay3"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextOverlay3(e.target.value)}
            value={textOverlay3}
            placeholder="Enter text for overlay 3"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none scrollbar-hide"
            rows={2}
          />
        </form>

        <form
          action=""
          className="space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="textOverlay4">Text Overlay 4</Label>
          <Textarea
            id="textOverlay4"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextOverlay4(e.target.value)}
            value={textOverlay4}
            placeholder="Enter text for overlay 4"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none scrollbar-hide"
            rows={2}
          />
        </form>
      </div>

      <div className="flex justify-center">
        <div
          ref={sharedContainerRef}
          className="relative inline-block overflow-hidden mx-auto"
          style={{ width: 400, height: 400 }}
        >
          <IKImage
            path={file.filePath}
            urlEndpoint={urlEndpoint}
            alt={file.name}
            width={400}
            height={400}
            className="select-none"
            transformation={
              [
                blur ? { raw: "bl-3" } : undefined,
                sharpen ? { raw: "e-sharpen-10" } : undefined,
                grayscale ? { raw: "e-grayscale" } : undefined,
              ].filter(Boolean) as any
            }
          />

          {textOverlay1 && (
            <div
              ref={elementRef1}
              className="absolute cursor-grab active:cursor-grabbing select-none bg-transparent text-white font-semibold px-2 py-1 rounded font-bold text-lg whitespace-pre-wrap touch-none "
              style={{
                left: position1.x,
                top: position1.y,
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown1}
              onTouchStart={handleTouchStart1}
            >
              {textOverlay1}
            </div>
          )}

          {textOverlay2 && (
            <div
              ref={elementRef2}
              className="absolute cursor-grab active:cursor-grabbing select-none bg-transparent text-white font-semibold px-2 py-1 rounded font-bold text-lg whitespace-pre-wrap touch-none "
              style={{
                left: position2.x,
                top: position2.y,
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown2}
              onTouchStart={handleTouchStart2}
            >
              {textOverlay2}
            </div>
          )}

          {textOverlay3 && (
            <div
              ref={elementRef3}
              className="absolute cursor-grab active:cursor-grabbing select-none bg-transparent text-white font-semibold px-2 py-1 rounded font-bold text-lg whitespace-pre-wrap touch-none"
              style={{
                left: position3.x,
                top: position3.y,
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown3}
              onTouchStart={handleTouchStart3}
            >
              {textOverlay3}
            </div>
          )}

          {textOverlay4 && (
            <div
              ref={elementRef4}
              className="absolute cursor-grab active:cursor-grabbing select-none bg-clip text-white font-semibold px-2 py-1 rounded font-bold text-lg whitespace-pre-wrap touch-none "
              style={{
                left: position4.x,
                top: position4.y,
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown4}
              onTouchStart={handleTouchStart4}
            >
              {textOverlay4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
