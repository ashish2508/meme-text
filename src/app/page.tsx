"use client";
import { IKImage } from "imagekitio-next";
export default function Home() {
  return (
    <div>
      <IKImage
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
        path="12.jpeg"
        width={400}
        height={400}
        alt="someone called me gay"
      />
    </div>
  );
}
