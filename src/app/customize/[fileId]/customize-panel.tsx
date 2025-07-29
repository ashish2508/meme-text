"use client";
import { urlEndpoint } from "@/app/providers";
import Element from "@/components/element";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [fontSize, setFontSize] = useState<string>("20");
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
    <div className="space-y-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch ">
        <Card className="space-y-4 p-4 w-fit border-2 border-pink-500/20">
          <h2 className="text-xl font-semibold">Effects</h2>
          <div className="flex gap-4">
            <Element s="blur" checked={blur} onCheckedChange={setBlur} />
            <Element s="border" checked={border} onCheckedChange={setBorder} />
            <Element s="sharpen" checked={sharpen} onCheckedChange={setSharpen} />
            <Element s="grayscale" checked={grayscale} onCheckedChange={setGrayscale} />
            <Element s="Crop Rounded" checked={croprounded} onCheckedChange={setCropRounded} />
          </div>
        </Card>
        <Card className="space-y-4 p-4 w-fit h-full border-2 border-pink-500/20">
          <h2 className="text-xl font-semibold">Font Size</h2>
          <div className="flex justify-center items-center gap-7">
            <div className="space-y-4 flex justify-start items-start flex-col">
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16">16px</SelectItem>
                  <SelectItem value="20">20px</SelectItem>
                  <SelectItem value="24">24px</SelectItem>
                  <SelectItem value="28">28px</SelectItem>
                  <SelectItem value="32">32px</SelectItem>
                  <SelectItem value="36">36px</SelectItem>
                  <SelectItem value="40">40px</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            className="scrollbar-hide w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="scrollbar-hide w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="scrollbar-hide w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="scrollbar-hide w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            rows={2}
          />
        </form>
      </div>

      <div className="flex justify-center items-center gap-8">
        <div
          ref={sharedContainerRef}
          className="relative inline-block overflow-hidden"
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
                border ? { raw: "b-80-000000" } : undefined,
                croprounded ? { raw: "r-max" } : undefined,
              ].filter(Boolean) as any
            }
          />

          {textOverlay1 && (
            <div
              ref={elementRef1}
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 font-bold text-black/80 active:cursor-grabbing"
              style={{
                left: position1.x,
                top: position1.y,
                fontSize: `${fontSize}px`,
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
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 font-bold text-black/80 active:cursor-grabbing"
              style={{
                left: position2.x,
                top: position2.y,
                fontSize: `${fontSize}px`,
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
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 font-bold text-black/80 active:cursor-grabbing"
              style={{
                left: position3.x,
                top: position3.y,
                fontSize: `${fontSize}px`,
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
              className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 font-bold text-black/80 active:cursor-grabbing"
              style={{
                left: position4.x,
                top: position4.y,
                fontSize: `${fontSize}px`,
              }}
              onMouseDown={handleMouseDown4}
              onTouchStart={handleTouchStart4}
            >
              {textOverlay4}
            </div>
          )}

        </div>

        <div className="flex items-center">
          <Button className="px-8 py-4 text-lg font-semibold">Download Image</Button>
        </div>
      </div>
    </div>
  );
}
