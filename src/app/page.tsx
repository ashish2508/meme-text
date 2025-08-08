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
  const [filePath, setFilePath] = useState("");
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Authentication request failed: ${message}`);
    }
  };
  return (
    <div>
   hello
    </div>
  );
}
