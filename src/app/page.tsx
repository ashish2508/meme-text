import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <Image
        src="https://ik.imagekit.io/jgj9xx779/tr:w-800,h-800,l-text,i-hello,l-end/tr=l-text,i-gay/12.jpeg?updatedAt=1752794741390"
        alt="meme"
        width={800}
        height={800}
        layout="intrinsic"
      />
    </div>
  );
}
