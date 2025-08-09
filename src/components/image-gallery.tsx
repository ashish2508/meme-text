"use client";

import FavButton from "@/components/favButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { Palette } from "lucide-react";
import Link from "next/link";
import { urlEndpoint } from "../app/providers";

interface ImageGalleryProps {
  files: FileObject[];
  favoriteIds: string[];
}

export function ImageGallery({ files, favoriteIds }: ImageGalleryProps) {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">No templates found</p>
        <p className="text-sm text-muted-foreground">Upload some images to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file) => {
        const isFavorited = favoriteIds.includes(file.fileId);

        return (
          <Card key={file.fileId} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-start">
                <div className="text-lg font-bold text-foreground truncate pr-2">
                  {file.customMetadata?.displayName ?? file.name}
                </div>
                <FavButton
                  isFavorited={isFavorited}
                  fileId={file.fileId}
                  filePath={file.filePath}
                  pathToRevalidate="/"
                />
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden">
                <IKImage
                  path={file.filePath}
                  urlEndpoint={urlEndpoint}
                  width={400}
                  height={400}
                  alt={file.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Button asChild className="w-full">
                <Link href={`/customize/${file.fileId}`}>
                  <Palette className="w-4 h-4 mr-2" />
                  Customize
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
