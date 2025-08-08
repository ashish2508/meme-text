"use client";
import FavButton from "@/components/favButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { urlEndpoint } from "../providers";

export function ResultsList({
  files,
  counts = [],
  favoritedFiles = [],
  searchQuery = "",
}: {
  files: FileObject[];
  counts?: {
    memeId: string;
    count: number;
  }[];
  searchQuery?: string;
  favoritedFiles?: string[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {files.map((file) => {
        const isFavorited = favoritedFiles.includes(file.fileId);

        return (
          <Card key={file.fileId}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="space-y-2">
                  <div className="text-3xl font-black font-mono">
                    {file.customMetadata?.displayName ?? file.name}
                  </div>
                  <p className="text-sm font-semibold text-gray-500">
                    {`(favorite by ${counts.find((c) => c.memeId === file.fileId)?.count ?? 0})`}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <FavButton
                    isFavorited={isFavorited}
                    fileId={file.fileId}
                    filePath={file.filePath}
                    pathToRevalidate={`/search?q=${encodeURIComponent(searchQuery)}`}
                  />
                </div>
              </CardTitle>

            </CardHeader>
            <CardContent>
              <IKImage
                key={file.fileId}
                path={file.filePath}
                urlEndpoint={urlEndpoint}
                width={800}
                height={800}
                alt={file.name}
              />
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/customize/${file.fileId}`}>Customize</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
