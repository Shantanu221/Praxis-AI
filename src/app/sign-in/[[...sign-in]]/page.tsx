"use client";
import { SignIn } from "@clerk/nextjs";
import { GitBranch, MessageSquare, FileSearch } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      <div className="relative w-full lg:w-1/2">
        <div className="flex min-h-screen items-center justify-center">
          <SignIn />
        </div>
      </div>

      <div className="relative hidden w-1/2 bg-gray-50 lg:block">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Digital Technology"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-gray-900/80 to-gray-900/90" />
        </div>

        <div className="relative flex h-full flex-col justify-center px-12">
          <div className="mb-12">
            <h2 className="mb-3 text-2xl font-medium text-purple-400">
              Praxis
            </h2>
            <h1 className="mb-6 text-5xl font-bold text-white">
              AI-Powered Code Intelligence
            </h1>
          </div>

          <div className="flex space-x-8">
            <div className="text-center">
              <GitBranch className="mx-auto mb-2 h-8 w-8 text-purple-400" />
              <span className="text-sm text-gray-300">Repository Analysis</span>
            </div>
            <div className="text-center">
              <MessageSquare className="mx-auto mb-2 h-8 w-8 text-purple-400" />
              <span className="text-sm text-gray-300">Meeting Insights</span>
            </div>
            <div className="text-center">
              <FileSearch className="mx-auto mb-2 h-8 w-8 text-purple-400" />
              <span className="text-sm text-gray-300">Smart Q&A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
