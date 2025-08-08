"use client";

import { IKImage } from "imagekitio-next";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FavButton from "@/components/favButton";
import { urlEndpoint } from "../providers";
import type { FileObject } from "imagekit/dist/libs/interfaces";

type FavoriteWithDetails = {
  memeId: string;
  filePath: string;
  file: Pick<FileObject, "fileId" | "filePath" | "name" | "customMetadata" | "width" | "height">;
};

export function FavoritesList({ favorites }: { favorites: FavoriteWithDetails[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {favorites.map(({ memeId, filePath, file }) => {
        const displayName = file.customMetadata?.displayName ?? file.name;
        return (
          <Card key={memeId}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div>{displayName}</div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <IKImage
                key={memeId}
                path={file.filePath}
                urlEndpoint={urlEndpoint}
                alt={file.name}
               width={800} 
               height={800}
              />

            </CardContent>

            <CardFooter className="flex gap-3">
              <Button asChild>
                <Link href={`/customize/${memeId}`}>Customize</Link>
              </Button>
              <FavButton
                pathToRevalidate="/favorites"
                fileId={memeId}
                filePath={filePath}
                isFavorited={true}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
