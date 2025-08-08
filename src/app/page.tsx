"use client";

import { SignInCard } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";
import { Heart, Palette, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-2xl font-semibold bg-gradient-to-t from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-pink-50/20 dark:to-pink-900/10">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-t from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
                Create Viral Memes
              </span>
              <br />
              <span className="text-foreground">
                in Seconds
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform any template into a viral sensation. Add text, customize colors, and download your masterpiece.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 rounded-lg border border-pink-500/20 bg-card">
              <Search className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h3 className="text-lg font-semibold mb-2">Browse Templates</h3>
              <p className="text-muted-foreground">Choose from thousands of popular meme templates</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-pink-500/20 bg-card">
              <Palette className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h3 className="text-lg font-semibold mb-2">Customize Everything</h3>
              <p className="text-muted-foreground">Add text, change colors, and make it yours</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-pink-500/20 bg-card">
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-500" />
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">Keep track of your favorite memes and templates</p>
            </div>
          </div>

          {/* Sign In Card */}
          <div className="flex justify-center">
            <SignInCard />
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated - show dashboard
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Welcome back, </span>
            <span className="bg-gradient-to-t from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
              {session.user?.name}!
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to create some viral content?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Button asChild size="lg" className="h-24 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
            <Link href="/search?q=">
              <Search className="w-6 h-6 mr-2" />
              Browse Templates
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="h-24 text-lg font-semibold border-2 border-pink-500/20 hover:bg-pink-50 dark:hover:bg-pink-900/20">
            <Link href="/favorites">
              <Heart className="w-6 h-6 mr-2" />
              My Favorites
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="h-24 text-lg font-semibold border-2 border-pink-500/20 hover:bg-pink-50 dark:hover:bg-pink-900/20 md:col-span-2 lg:col-span-1">
            <Link href="/search?q=popular">
              <Palette className="w-6 h-6 mr-2" />
              Popular Memes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
