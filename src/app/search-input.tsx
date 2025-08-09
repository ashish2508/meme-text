"use client";

import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
  const queryString = useSearchParams();
  const { data: session } = useSession();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleFocus = () => {
    if (!session) {
      setShowAuthPrompt(true);
    }
  };

  const handleSignIn = () => {
    signIn("google", { redirectTo: "/search?q=" });
  };

  return (
    <div className="relative">
      <Input
        name="search"
        type="search"
        defaultValue={queryString.get("q") ?? ""}
        placeholder={session ? "Search memes..." : "Sign in to search memes..."}
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        onFocus={handleFocus}
        disabled={!session}
      />

      {showAuthPrompt && !session && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border border-pink-500/20 rounded-lg shadow-lg z-50">
          <div className="text-sm text-muted-foreground mb-3">
            You need to sign in to search for meme templates
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSignIn}
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm rounded font-medium hover:from-pink-600 hover:to-rose-600"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowAuthPrompt(false)}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
