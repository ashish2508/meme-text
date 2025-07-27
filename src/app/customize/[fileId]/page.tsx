import { imagekit } from "@/app/lib/image-kit";
import { UploadMemeButton } from "@/app/search/upload-meme-button";
import { unstable_noStore } from "next/cache";


export default async function CustomizePage({
  params,
}: {
  params: { fileId: string };
}) {
  unstable_noStore();


  const file = await imagekit.getFileDetails(params.fileId);

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <h1 className="text-4xl font-bold">Customize 
        <p 
        className="text-6xl text-emerald-500"
        >
        {file.customMetadata?.displayName || file.name}
        </p>
        </h1>
      <UploadMemeButton />
    </div>
  );
}
