'use server'


import { db } from "@/app/db/db";
import { favoriteCounts, favorites } from "@/app/db/schema";
import { assertAuthenticated } from "@/app/lib/auth-utils";
import { auth } from "@/auth";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleFavMemeAction(
  fileId: string,
  filePath: string,
) {
  const userId = await assertAuthenticated();
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
  revalidatePath(`/customize/${fileId}`);
}
