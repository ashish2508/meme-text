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
  file,
  isFavorited,
}: {
  files: FileObject[];
  counts?: {
    memeId: string;
    count: number;
  }[];
  file: Pick<FileObject, "filePath" | "name" | "customMetadata" | "width" | "height" | "fileId">;
  isFavorited: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {files.map((file) => (
        <Card key={file.fileId}>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div>{file.customMetadata?.displayName ?? file.name} </div>
              <div className="flex gap-1 items-center">
                <FavButton isFavorited={isFavorited} fileId={file.fileId} filePath={file.filePath} pathToRevalidate={`/customize/${file.fileId}`} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IKImage
              key={file.fileId}
              path={file.filePath}
              urlEndpoint={urlEndpoint}
              alt={file.name}
            />
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/customize/${file.fileId}`}>Customize</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
