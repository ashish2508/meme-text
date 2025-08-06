"use client";
import { Button } from "@/components/ui/button";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "./providers";
interface AuthResponse {
  signature: string;
  expire: number;
  token: string;
}

export default function Home() {
  const [filePath,setFilePath]= useState("");
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const authenticator: () => Promise<AuthResponse> = async () => {
    try {
      const response = await fetch("/api/auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const signature = String(data.signature);
      const expire = Number(data.expire);
      const token = String(data.token);

      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  return (
    <div>
      <Button>Click me</Button>
      <ImageKitProvider publicKey={publicKey} authenticator={authenticator!} urlEndpoint={urlEndpoint}>
        {filePath && (
        <IKImage
          path={filePath}
          alt="text"
          width={400}
          height={400}
        /> 
        )}

        <div>
          <h2>File Upload</h2>
          <IKUpload
            fileName={"img_.jpeg"}
            onError={(error) => {
              console.error("Upload error:", error);
            }}
            onSuccess={(response) => {
              console.log("Upload successful", response);
              setFilePath(response.filePath);
            }}
          />
        </div>

      </ImageKitProvider>
    </div>
  );
}
