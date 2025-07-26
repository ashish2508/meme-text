import { unstable_noStore } from "next/cache";
import { imagekit } from "../lib/image-kit";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { ResultsList } from "./results-list";
import { UploadMemeButton } from "./upload-meme-button";

function fuzzySearch(query: string, text: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();
  
  if (normalizedQuery.length <= 2) return normalizedText === normalizedQuery || normalizedText.includes(normalizedQuery);
  
  if (normalizedText.includes(normalizedQuery)) return true;  
  
  let queryIndex = 0, matchCount = 0;
  for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIndex]) {
      matchCount++;
      queryIndex++;
    }
  }
  const matchRatio = matchCount / normalizedQuery.length;
  return matchRatio >= 0.7;
}

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
        <p className="text-gray-500">Please enter a search term.</p>
      </div>
    );
  }

  const allFiles = await imagekit.listFiles({
    limit: 1000, 
  });

  const filteredFiles = allFiles.filter((item) => {
    if (item.type === 'folder') return false;

    const file = item as FileObject;
    const displayName = file.customMetadata?.displayName || file.name;

    return fuzzySearch(query, String(displayName)) ||
      (file.name !== displayName && fuzzySearch(query, file.name));
  });

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
      <ResultsList files={filteredFiles} />
    </div>
  );
}
