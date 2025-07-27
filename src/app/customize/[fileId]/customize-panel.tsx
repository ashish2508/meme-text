"use client"
import { urlEndpoint } from "@/app/providers";
import type { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";

export function CustomizePanel({
  file,
}:{
  file: Pick<FileObject,'filePath' | 'name'>
}) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <form action=""></form>
    <IKImage
      path={file.filePath}
      urlEndpoint={urlEndpoint}
      alt={file.name}
      width={300}
      height={800}
    />
    </div>
  );
}
