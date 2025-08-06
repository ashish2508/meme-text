import { unstable_noStore } from "next/cache";
import { UploadMemeButton } from "../search/upload-meme-button";


export default async function FavoritesPage() {
  unstable_noStore();

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Favorites</h1>
        <UploadMemeButton />
      </div>
    </div>
  );
}
