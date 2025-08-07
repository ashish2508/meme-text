import { unstable_noStore } from "next/cache";
import { getFavorites } from "./loaders";
import { FavoritesList } from "./favorites-list";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import emptyImage from "/public/assets/empty.png";

export default async function FavoritesPage() {
  unstable_noStore();

  const favorites = await getFavorites();

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Favorites</h1>
      </div>

      {favorites.length === 0 && (
        <Card className="py-8 flex flex-col items-center justify-center gap-4">
          <Image
            src={emptyImage}
            className="object-cover"
            alt="a not found image"
          />
          <p className="text-xl text-gray-300">You didn't liked what you made?</p>
          <Button asChild className="w-fit bg-pink-600/40 text-black dark:text-white border-[3px] border-rose-900/30 px-[15px] py-[10px] hover:bg-amber-200/40 hover:text-black scale-80 hover:scale-110 transition-all duration-300 rounded-2xl shadow-lg hover:dark:bg-pink-900/90 hover:dark:text-black hover:dark:border-rose-500/30">
            <Link href="/search?q=">Find some Memes</Link>
          </Button>

        </Card>
      )}

      {favorites.length > 0 && <FavoritesList favorites={favorites} />}
    </div>
  );
}
