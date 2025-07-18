"use client";
import { IKImage } from "imagekitio-next";
export default function Home() {
  return (
    <div>
      <IKImage
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
        path="12.jpeg"
        alt="text"
        width={400}
        height={400}
        transformation={[
          { raw: "l-text,i-didn't post today,fs-20,l-end" },
        ]}
      />
    </div>
  );
}
