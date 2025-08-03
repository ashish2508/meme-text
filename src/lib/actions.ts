'use server'

import { auth } from "@/auth";

export async function favMeme(imageId: string) {
  const session = await auth();
  
}
