"use client";
import { urlEndpoint } from "@/app/providers";
import DownloadButton from "@/components/Download-Button";
import Element from "@/components/element";
import FavButton from "@/components/favButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDownloadMeme } from "@/hooks/useDownloadMeme";
import { useDraggable } from "@/hooks/useDraggable";
import { useImageEffects } from "@/hooks/useImageEffects";
import type { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { Palette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useRef, useState } from "react";

export function CustomizePanel({
  file,
  isFavorited,
}: {
  file: Pick<FileObject, "filePath" | "name" | "customMetadata" | "width" | "height" | "fileId">;
  isFavorited: boolean;
}) {
  const [textOverlay1, setTextOverlay1] = useState<string>("");
  const [textOverlay2, setTextOverlay2] = useState<string>("");
  const [textOverlay3, setTextOverlay3] = useState<string>("");
  const [textOverlay4, setTextOverlay4] = useState<string>("");
  const [colorOverlay1, setColorOverlay1] = useState<string>("#ffffff");
  const [colorOverlay2, setColorOverlay2] = useState<string>("#ffffff");
  const [colorOverlay3, setColorOverlay3] = useState<string>("#ffffff");
  const [colorOverlay4, setColorOverlay4] = useState<string>("#ffffff");

  const sharedContainerRef = useRef<HTMLDivElement>(null);
  const { download, isDownloading, error } = useDownloadMeme();

  const { blur, border, sharpen, grayscale, croprounded, setBlur, setBorder, setSharpen, setGrayscale, setCropRounded } = useImageEffects();
  const [fontSize, setFontSize] = useState<string>("20");

  const handleColorChange = (overlayNumber: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (overlayNumber) {
      case 1: setColorOverlay1(value); break;
      case 2: setColorOverlay2(value); break;
      case 3: setColorOverlay3(value); break;
      case 4: setColorOverlay4(value); break;
    }
  };

  const handleColorPickerChange = (overlayNumber: number) => (color: string) => {
    switch (overlayNumber) {
      case 1: setColorOverlay1(color); break;
      case 2: setColorOverlay2(color); break;
      case 3: setColorOverlay3(color); break;
      case 4: setColorOverlay4(color); break;
    }
  };

  const isValidHex = (hex: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const ColorPickerSection = ({ overlayNumber, colorValue, label }: { overlayNumber: number, colorValue: string, label: string }) => (
    <div className="flex flex-col gap-3">
      <Label htmlFor={`colorOverlay${overlayNumber}`}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          id={`colorOverlay${overlayNumber}`}
          type="text"
          value={colorValue}
          onChange={handleColorChange(overlayNumber)}
          placeholder="#ffffff"
          className="flex-1 border-pink-500/20 bg-background text-foreground dark:bg-background dark:text-foreground"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        />

        <div
          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
          style={{ backgroundColor: isValidHex(colorValue) ? colorValue : '#ffffff' }}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-8 h-8 p-1 border-pink-500/20 hover:bg-pink-50 dark:hover:bg-pink-900/20"
            >
              <Palette size={16} className="text-pink-600 dark:text-pink-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3 bg-background border border-border" align="start">
            <div className="color-picker-container">
              <HexColorPicker
                color={isValidHex(colorValue) ? colorValue : '#ffffff'}
                onChange={handleColorPickerChange(overlayNumber)}
                style={{ width: '200px', height: '150px' }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  // [All the draggable hooks remain the same...]
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

  const handleDownload = async () => {
    if (!sharedContainerRef.current) return;
    const fileName = String(file.name || 'meme');
    const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, '-');
    await download({
      containerRef: sharedContainerRef.current,
      fileName: `meme-${cleanName}`,
      width: file.width,
      height: file.height,
      scale: 6,
    });
  };

  return (
    <>
      <style jsx global>{`
        .color-picker-container .react-colorful {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          touch-action: none;
        }
        .color-picker-container .react-colorful__saturation {
          border-radius: 6px 6px 0 0;
          touch-action: none;
        }
        .color-picker-container .react-colorful__hue {
          border-radius: 0 0 6px 6px;
          height: 24px;
          touch-action: none;
        }
        .color-picker-container .react-colorful__pointer {
          width: 18px;
          height: 18px;
          touch-action: none;
        }
        .color-picker-container .react-colorful__interactive {
          touch-action: none;
          cursor: crosshair;
        }
        
        [data-radix-popper-content-wrapper] {
          z-index: 9999 !important;
        }
        
        .react-colorful * {
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold sm:text-3xl bg-gradient-to-t from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
          Customizing template:
        </h1>
        <div className="flex gap-2 justify-end items-center w-fit">
          <FavButton isFavorited={isFavorited} fileId={file.fileId} filePath={file.filePath} pathToRevalidate={`/customize/${file.fileId}`} />
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <DownloadButton />
          </Button>
          {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
        </div>
      </div>

      <div className="space-y-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <Card className="space-y-4 p-4 w-fit border-2 border-pink-500/20">
            <h2 className="text-2xl font-semibold">Effects</h2>
            <div className="flex gap-4">
              <Element s="blur" checked={blur} onCheckedChange={setBlur} />
              <Element s="border" checked={border} onCheckedChange={setBorder} />
              <Element s="sharpen" checked={sharpen} onCheckedChange={setSharpen} />
              <Element s="grayscale" checked={grayscale} onCheckedChange={setGrayscale} />
              <Element s="Crop Rounded" checked={croprounded} onCheckedChange={setCropRounded} />
            </div>
          </Card>
          <Card className="space-y-4 p-4 w-[15%] max-md:w-fit h-full border-2 border-pink-500/20">
            <h2 className="flex text-2xl font-semibold items-center justify-center">Font Size</h2>
            <div className="flex justify-center items-center gap-7">
              <div className="space-y-4 flex justify-start items-start flex-col">
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="30">30px</SelectItem>
                    <SelectItem value="56">56px</SelectItem>
                    <SelectItem value="78">78px</SelectItem>
                    <SelectItem value="92">92px</SelectItem>
                    <SelectItem value="116">116px</SelectItem>
                    <SelectItem value="140">140px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((num) => {
            const textValue = num === 1 ? textOverlay1 : num === 2 ? textOverlay2 : num === 3 ? textOverlay3 : textOverlay4;
            const colorValue = num === 1 ? colorOverlay1 : num === 2 ? colorOverlay2 : num === 3 ? colorOverlay3 : colorOverlay4;
            const setTextValue = num === 1 ? setTextOverlay1 : num === 2 ? setTextOverlay2 : num === 3 ? setTextOverlay3 : setTextOverlay4;

            return (
              <form key={num} className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <Label htmlFor={`textOverlay${num}`}>Text Overlay {num}</Label>
                <Textarea
                  id={`textOverlay${num}`}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextValue(e.target.value)}
                  value={textValue}
                  placeholder={`Enter text for overlay ${num}`}
                  className="scrollbar-hide w-full resize-none rounded-md border border-pink-500/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={2}
                />
                <ColorPickerSection overlayNumber={num} colorValue={colorValue} label="Text Color (Hex)" />
              </form>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
          <div ref={sharedContainerRef} className="relative inline-block overflow-hidden w-fit scale-52 h-fit">
            <div id="meme">
              <IKImage
                path={file.filePath}
                urlEndpoint={urlEndpoint}
                alt={file.name}
                width={file.width}
                height={file.height}
                className="select-none"
                transformation={[
                  { quality: 100 },
                  blur ? { raw: "bl-3" } : undefined,
                  sharpen ? { raw: "e-sharpen-10" } : undefined,
                  grayscale ? { raw: "e-grayscale" } : undefined,
                  border ? { raw: "b-80-000000" } : undefined,
                  croprounded ? { raw: "r-max" } : undefined,
                ].filter(Boolean) as any}
              />
            </div>

            {[
              { text: textOverlay1, color: colorOverlay1, position: position1, elementRef: elementRef1, onMouseDown: handleMouseDown1, onTouchStart: handleTouchStart1 },
              { text: textOverlay2, color: colorOverlay2, position: position2, elementRef: elementRef2, onMouseDown: handleMouseDown2, onTouchStart: handleTouchStart2 },
              { text: textOverlay3, color: colorOverlay3, position: position3, elementRef: elementRef3, onMouseDown: handleMouseDown3, onTouchStart: handleTouchStart3 },
              { text: textOverlay4, color: colorOverlay4, position: position4, elementRef: elementRef4, onMouseDown: handleMouseDown4, onTouchStart: handleTouchStart4 },
            ].map((overlay, index) =>
              overlay.text && (
                <div
                  key={index}
                  ref={overlay.elementRef}
                  className="absolute cursor-grab touch-none select-none whitespace-pre-wrap rounded bg-transparent px-2 py-1 font-black active:cursor-grabbing text-rendering-optimized"
                  style={{
                    left: overlay.position.x,
                    top: overlay.position.y,
                    fontSize: `${fontSize}px`,
                    color: isValidHex(overlay.color) ? overlay.color : '#ffffff',
                  }}
                  onMouseDown={overlay.onMouseDown}
                  onTouchStart={overlay.onTouchStart}
                >
                  {overlay.text}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
