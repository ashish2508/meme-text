"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignInCard() {
  return (
    <Card className="w-full max-w-md mx-auto border-2 border-pink-500/20 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-t from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
          Welcome to Memeify
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to create and customize amazing memes, save your favorites, and more!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-3">
          <Button
            onClick={() => signIn("google", { redirectTo: "/search?q=" })}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our terms of service and privacy policy.
          </div>
        </div>

        <div className="pt-4 border-t border-pink-500/20">
          <p className="text-sm text-muted-foreground text-center">
            🚀 Create viral memes<br />
            ⭐ Save your favorites<br />
            🎨 Access all templates
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickSignInButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      className="border-2 border-pink-500/20 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:border-pink-500/40"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
}
