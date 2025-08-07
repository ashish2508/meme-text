import { imagekit } from "@/app/lib/image-kit";
import { auth } from "@/auth";
import { unstable_noStore } from "next/cache";
import { CustomizePanel } from "./customize-panel";
import { getFavoriteMeme } from "./loader";


export default async function CustomizePage({
  params,
}: {
  params: { fileId: string };
}) {
  unstable_noStore();
  const session = await auth();

  const file = await imagekit.getFileDetails(params.fileId);
  const isFavorited = await getFavoriteMeme(params.fileId);
  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <p className="text-xl sm:text-xl cursor-pointer font-semibold">
        <a href={`/search?q=${file.customMetadata?.displayName || file.name}`}
          className="text-xl font-bold sm:text-4xl bg-[linear-gradient(to_right,#ff8177_0%,#ff867a_0%,#ff8c7f_21%,#f99185_52%,#cf556c_78%,#b12a5b_100%)] bg-clip-text text-transparent hover:underline hover:text-zinc-400 dark:hover:text-gray-300">
          {file.customMetadata?.displayName || file.name}
        </a>
      </p>
      <CustomizePanel 
      isAuthenticated={!!session}
      file={{
        filePath: file.filePath,
        name: file.name,
        width: file.width,
        height: file.height,
        customMetadata: file.customMetadata || {},
        fileId: file.fileId
      }}
        isFavorited={isFavorited}
      />
    </div>
  );
}
