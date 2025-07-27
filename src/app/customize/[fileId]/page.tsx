import { imagekit } from "@/app/lib/image-kit";
import { unstable_noStore } from "next/cache";
import { CustomizePanel } from "./customize-panel";


export default async function CustomizePage({
  params,
}: {
  params: { fileId: string };
}) {
  unstable_noStore();


  const file = await imagekit.getFileDetails(params.fileId);

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
  <h1 className="text-3xl font-bold sm:text-4xl text-gray-800 dark:text-cyan-400/50">
    Customizing template:
  </h1>
  
  <p className="text-4xl sm:text-5xl cursor-pointer font-medium">
    <a href={`/search?q=${file.customMetadata?.displayName || file.name}`}
      className="text-rose-600/40 dark:text-gray-400 hover:underline hover:text-zinc-400 dark:hover:text-gray-300">
      {file.customMetadata?.displayName || file.name}
    </a>
  </p>
  
  <CustomizePanel file={{
    filePath: file.filePath, 
    name: file.name
  }} />
</div>


  );
}
