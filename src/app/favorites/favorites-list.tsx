"use client";

import FavButton from "@/components/favButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { urlEndpoint } from "../providers";
import type { FavoriteWithDetails } from "./page";


export function FavoritesList({ favorites }: { favorites: FavoriteWithDetails[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {favorites.map(({ memeId, filePath, file }) => {
        return (
          <Card key={memeId}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="text-3xl font-black font-mono">{file.customMetadata?.displayName ?? file.name}</div>
                <FavButton
                  pathToRevalidate="/favorites"
                  fileId={memeId}
                  filePath={filePath}
                  isFavorited={true}
                />
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
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
