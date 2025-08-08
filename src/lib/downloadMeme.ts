export interface DownloadMemeOptions {
  containerRef: HTMLDivElement;
  fileName: string;
  width?: number;
  height?: number;
  scale?: number;
}

export const downloadMeme = async ({
  containerRef,
  fileName,
  width = containerRef.offsetWidth,
  height = containerRef.offsetHeight,
  scale = 6,
}: DownloadMemeOptions): Promise<void> => {
  if (!containerRef) {
    throw new Error("Container reference is required");
  }

  const elements = containerRef.querySelectorAll('[class*="cursor-grab"]');
  elements.forEach(el => {
    el.classList.add("cursor-default");
    el.classList.remove("cursor-grab");
  });

  try {
    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(containerRef, {
      backgroundColor: null,
      scale,
      useCORS: true,
      allowTaint: true,
      width,
      height,
      logging: false,
      imageTimeout: 15000,
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${fileName}-${Date.now()}.png`;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          resolve();
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png", 1.0);
    });
  } catch (error) {
    throw new Error(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    elements.forEach(el => {
      el.classList.remove("cursor-default");
      el.classList.add("cursor-grab");
    });
  }
};
