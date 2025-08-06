'use server'


import { db } from "@/app/db/db";
import { favoriteCounts, favorites } from "@/app/db/schema";
import { auth } from "@/auth";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function favMemeAction(
  fileId: string,
  filePath: string,
) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user?.id;
  if (!userId) {
    throw new Error("User ID not found in session");
  }
  {

    const favorite = await db.query.favorites.findFirst({
      where: and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)),
    });
    if (favorite) {
      await db
        .delete(favorites)
        .where(and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)));
      await db
        .update(favoriteCounts)
        .set({
          count: sql`${favoriteCounts.count} - 1`,
        })
        .where(eq(favoriteCounts.memeId, fileId));
    } else {
      await db.insert(favorites).values({
        userId,
        memeId: fileId,
        filePath: filePath,
      });
    }
  }
}
