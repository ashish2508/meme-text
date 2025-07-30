import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center py-8">
      <Image
        src="/assets/rust.png"
        alt="Not Found"
        width={300}
        height={300}
        className="mb-8 object-cover rounded-4xl"
      />
      <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Oops! Page Not Found
      </h1>
      <p className="mb-8 leading-7 [&:not(:first-child)]:mt-6">
        Looks like this page got lost in meme!
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Take me home
      </Link>
    </main>
  )
}
