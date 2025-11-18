// app/page.tsx

import Link from 'next/link';

// SEO Metadata is defined directly on the page component
export const metadata = {
  title: "Gamified Reader - Simple Edition",
  description: "A simple, beginner-friendly exercise in building a reading tracker with Next.js and BetterAuth.",
  keywords: "reading tracker, gamification, nextjs, public domain, simple app",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-indigo-700 mb-2">
          Simple Reading Tracker
        </h1>
        <p className="text-xl text-gray-600">
          Track pages, check the leaderboard. Built with Next.js and BetterAuth.
        </p>
      </header>

      <main className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Get Started
        </h2>
        
        <div className="space-y-3">
            <Link
                href="/login"
                className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
                Log In / Sign Up
            </Link>
            <Link
                href="/leaderboard"
                className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
                View Leaderboard (Public)
            </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
            *Note: This version uses an in-memory store and is for learning purposes only.
        </p>
      </main>
    </div>
  );
}
