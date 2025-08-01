import { auth, signIn, signOut } from "@/auth";
import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CircleUser, MenuIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SearchInput } from "./search-input";


export async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src={"/logo.png"}
            alt={'Memeify Logo'}
            width={120}
            height={100}
            className="h-6 w-full md:h-8"
            priority
          />
          <span className="sr-only">Memeify</span>
        </Link>
        <Link
          href="/search?q="
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse
        </Link>
        {session && (
          <Link
            href="/favorites"
            className="text-muted-foreground hover:text-foreground"
          >
            Favorites
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image
                src={"/logo.png"}
                alt={'Memeify Logo'}
                width={120}
                height={100}
                className="h-6 w-auto md:h-8"
                priority
              />
              <span className="sr-only">Memeify</span>
            </Link>
            <Link
              href="/search?q="
              className="text-muted-foreground hover:text-foreground"
            >
              Browse
            </Link>

            {session && (
              <Link
                href="/favorites"
                className="text-muted-foreground hover:text-foreground"
              >
                Favorites
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          action={async (formData) => {
            "use server";
            const search = formData.get("search");
            redirect(`/search?q=${search}`);
          }}
          className="ml-auto flex-1 sm:flex-initial"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SearchInput />
          </div>
        </form>
        <ThemeToggle />

        <AccountMenu />
      </div>
    </header>
  );
}

async function AccountMenu() {
  const session = await auth();

  if (!session) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit" className="dark:bg-stone-900/80 border-2 border-rose-500/60 dark:border-pink-500/30 text-white dark:hover:text-white dark:hover:bg-slate-300/20 hover:bg-amber-200/40 hover:text-black scale-80 hover:scale-110 ">Sign in</Button>
      </form>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <VisuallyHidden>

          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </VisuallyHidden>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
               await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
