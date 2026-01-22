import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-purple-100 selection:text-purple-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">

            <span className="font-bold text-xl tracking-tight">Not<span className="text-purple-600">ely</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 text-sm font-medium bg-purple-600 text-white rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-16 py-12 lg:py-20">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100 animate-fade-in-up">
                <Sparkles size={16} />
                <span>Pour out your feelings here...</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Capture your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  finest thoughts.
                </span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The minimal, powerful notes app designed to help you organize your life with clarity and style. Join thousands of thinkers today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Writing Free <ArrowRight size={20} />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  Existing Member
                </Link>
              </div>

            </div>

            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-32 bg-purple-50 rounded-xl p-4 mt-6">
                    <p className="text-purple-900 font-medium">✨ Project Ideas</p>
                    <ul className="mt-2 space-y-2 text-sm text-purple-700">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Redesign home page</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Fix authentication flow</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>Sort daily tasks</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-200/30 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
