import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto grid gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="text-lg font-extrabold">Memefy</div>
          <p className="mt-2 max-w-xs text-sm text-slate-600">A meme-fueled playground to transform visuals with motion.</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="#before-after" className="hover:text-slate-900">
                Before/After
              </Link>
            </li>
            <li>
              <Link href="#pipeline" className="hover:text-slate-900">
                Pipeline
              </Link>
            </li>
            <li>
              <Link href="#remix" className="hover:text-slate-900">
                Remix Lab
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="#" className="hover:text-slate-900">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-slate-900">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-slate-900">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="#" className="hover:text-slate-900">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-slate-900">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-slate-900">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Memefy. All rights reserved.</p>
          <p>Built with Next.js and GSAP.</p>
        </div>
      </div>
    </footer>
  )
}
