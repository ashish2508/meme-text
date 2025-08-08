import { auth } from "@/auth";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getFavorites } from "../favorites/loaders";
import fuzzySearch from "../lib/fuzzy-search";
import { imagekit } from "../lib/image-kit";
import { getFavoriteCounts } from "./loader";
import { ResultsList } from "./results-list";
import { UploadMemeButton } from "./upload-meme-button";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  unstable_noStore();
  const session = await auth();
  if (!session) {
    redirect("http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fsignin");
  }
  const userId = await session.user?.id;
  if (!userId) {
    redirect("http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fsignin");
  }
  const query = searchParams.q?.trim();

  if (!query) {
    return (
      <div className="container mx-auto space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Search Results</h1>
          <div className="self-start sm:self-auto">
            {session && <UploadMemeButton />}
          </div>
        </div>
        <p className="text-gray-500 text-xl sm:text-2xl lg:text-3xl font-black">
          {"Please enter a search term->"}
        </p>
      </div>
    );
  }

  const allFiles = await imagekit.listFiles({
    limit: 1000,
  });

  const filteredFiles: FileObject[] = allFiles
    .filter((item): item is FileObject => {
      if (item.type === 'folder' || !('fileId' in item)) return false;

      const file = item as FileObject;
      const displayName = file.customMetadata?.displayName || file.name;

      const nameMatch =
        fuzzySearch(query, String(displayName)) ||
        (file.name !== displayName && fuzzySearch(query, file.name));

      const tagMatch =
        file.tags && file.tags.some((tag) => fuzzySearch(query, String(tag)));

      return !!nameMatch || !!tagMatch;
    });

  const favoriteCounts = await getFavoriteCounts(
    filteredFiles.map((file) => file.fileId)
  );
  const favorites = await getFavorites();
  const favoritedFileIds = favorites.map((favorite) => favorite.memeId);

  return (
    <div className="container mx-auto space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Search Results {query && `for "${query}"`}
        </h1>
        <div className="self-start sm:self-auto">
          {session && <UploadMemeButton />}
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          {`No results found for "${query}"`}
        </p>
      ) : (
        <p className="text-xs sm:text-sm text-gray-600">
          Found {filteredFiles.length} result{filteredFiles.length !== 1 ? "s" : ""}
        </p>
      )}

      <ResultsList
        files={filteredFiles}
        counts={favoriteCounts}
        favoritedFiles={favoritedFileIds}
        searchQuery={query}
      />
    </div>
  );
}
