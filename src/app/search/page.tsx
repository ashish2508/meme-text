import { unstable_noStore } from "next/cache";
import { imagekit } from "../lib/image-kit";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { ResultsList } from "./results-list";
import { UploadMemeButton } from "./upload-meme-button";
import fuzzySearch from "../lib/fuzzy-search";
import { getFavorites } from "../favorites/loaders";


export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  unstable_noStore();

  const query = searchParams.q?.trim();

  if (!query) {
    return (
      <div className="container mx-auto space-y-8 py-8 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Search Results</h1>
          <UploadMemeButton />
        </div>
        <p className="text-gray-500 text-4xl font-black">{"Please enter a search term->"}</p>
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

      const nameMatch = fuzzySearch(query, String(displayName)) ||
        (file.name !== displayName && fuzzySearch(query, file.name));

      const tagMatch = file.tags && file.tags.some(tag =>
        fuzzySearch(query, String(tag))
      );

      return nameMatch || tagMatch;
    });

  const favorites = await getFavorites();
  const favoritedFileIds = favorites.map(favorite => favorite.memeId);

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Search Results {query && `for "${query}"`}
        </h1>
        <UploadMemeButton />
      </div>
      {filteredFiles.length === 0 ? (
        <p className="text-gray-500">No results found for "{query}"</p>
      ) : (
        <p className="text-sm text-gray-600">
          Found {filteredFiles.length} result{filteredFiles.length !== 1 ? 's' : ''}
        </p>
      )}
      <ResultsList
        files={filteredFiles}
        favoritedFiles={favoritedFileIds}
        searchQuery={query}
      />
    </div>
  );
}
