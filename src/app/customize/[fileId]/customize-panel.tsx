"use client";
import { urlEndpoint } from "@/app/providers";
import Element from "@/components/element";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDraggable } from "@/hooks/useDraggable";
import { useImageEffects } from "@/hooks/useImageEffects";
import type { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useRef, useState } from "react";

export function CustomizePanel({
  file,
}: {
  file: Pick<FileObject, "filePath" | "name">;
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");
  const [textOverlay2, setTextOverlay2] = useState<string>("");
  const [textOverlay3, setTextOverlay3] = useState<string>("");
  const [textOverlay4, setTextOverlay4] = useState<string>("");

  const sharedContainerRef = useRef<HTMLDivElement>(null);

  const { blur, border, sharpen, grayscale, croprounded, setBlur, setBorder, setSharpen, setGrayscale, setCropRounded } = useImageEffects();

  const {
    position: position1,
    elementRef: elementRef1,
    handleMouseDown: handleMouseDown1,
    handleTouchStart: handleTouchStart1,
  } = useDraggable({
    initialPosition: { x: 50, y: 50 },
    containerRef: sharedContainerRef,
  });

  const {
    position: position2,
    elementRef: elementRef2,
    handleMouseDown: handleMouseDown2,
    handleTouchStart: handleTouchStart2,
  } = useDraggable({
    initialPosition: { x: 100, y: 100 },
    containerRef: sharedContainerRef,
  });

  const {
    position: position3,
    elementRef: elementRef3,
    handleMouseDown: handleMouseDown3,
    handleTouchStart: handleTouchStart3,
  } = useDraggable({
    initialPosition: { x: 150, y: 50 },
    containerRef: sharedContainerRef,
  });

  const {
    position: position4,
    elementRef: elementRef4,
    handleMouseDown: handleMouseDown4,
    handleTouchStart: handleTouchStart4,
  } = useDraggable({
    initialPosition: { x: 200, y: 100 },
    containerRef: sharedContainerRef,
  });

  return (
    <div className="space-y-6">
      <div>
        <Card className="space-y-4 p-4">
          <h2 className="text-xl">Effects</h2>
          <div className="flex gap-4">
            <Element s="blur" checked={blur} onCheckedChange={setBlur} />
            <Element s="border" checked={border} onCheckedChange={setBorder} />
            <Element s="sharpen" checked={sharpen} onCheckedChange={setSharpen} />
            <Element s="grayscale" checked={grayscale} onCheckedChange={setGrayscale} />
            <Element s="Crop Rounded" checked={croprounded} onCheckedChange={setCropRounded} />
          </div>

        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <form
          action=""
          className="space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="textOverlay1">Text Overlay 1</Label>
          <Textarea
            id="textOverlay1"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextOverlay1(e.target.value)
            }
            value={textOverlay1}
            placeholder="Enter text for overlay 1"
            className="scrollbar-hide flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextOverlay2(e.target.value)
            }
            value={textOverlay2}
            placeholder="Enter text for overlay 2"
            className="scrollbar-hide flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextOverlay3(e.target.value)
            }
            value={textOverlay3}
            placeholder="Enter text for overlay 3"
            className="scrollbar-hide flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextOverlay4(e.target.value)
            }
            value={textOverlay4}
            placeholder="Enter text for overlay 4"
            className="scrollbar-hide flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            rows={2}
          />
        </form>
      </div>

      <div className="flex justify-center">
        <div
          ref={sharedContainerRef}
          className="relative mx-auto inline-block overflow-hidden"
          style={{ width: 400, height: 400 }}
        >
          <div className="flex flex-col-4 gap-4">
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
                  border ? { raw: "b-80-000000" } : undefined,
                  croprounded ? { raw: "r-max" } : undefined,
                ].filter(Boolean) as any
              }
            />
          </div>
          {textOverlay1 && (
            <div
              ref={elementRef1}
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 text-lg font-bold font-semibold text-white active:cursor-grabbing"
              style={{
                left: position1.x,
                top: position1.y,
                userSelect: "none",
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
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 text-lg font-bold font-semibold text-white active:cursor-grabbing"
              style={{
                left: position2.x,
                top: position2.y,
                userSelect: "none",
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
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 text-lg font-bold font-semibold text-white active:cursor-grabbing"
              style={{
                left: position3.x,
                top: position3.y,
                userSelect: "none",
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
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded px-2 py-1 text-lg font-bold font-semibold text-white active:cursor-grabbing"
              style={{
                left: position4.x,
                top: position4.y,
                userSelect: "none",
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
