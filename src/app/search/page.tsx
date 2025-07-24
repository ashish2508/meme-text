import { imagekit } from "../lib/image-kit";
import { unstable_noStore } from 'next/cache';
import { ResultsList } from "./results-list";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  unstable_noStore();
  const files = await imagekit.listFiles({
    searchQuery: `name:${searchParams.q}`,
    limit: 10,
  }).then((response:any) => {
    console.log(response);
    return response;
  }).catch((error:any) => {
    console.error('Error fetching files:', error);
  });
  const favoriteCounts = 10;
  return (
    <div>{files.map((file:any) => {
      return (
        <div key={file.fileId}>
          <h3>{file.name}</h3>
          <ResultsList files={files} />

        </div>
      );
    })}</div>
  )
}
