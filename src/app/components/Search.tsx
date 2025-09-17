"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Suspense } from "react";

// Component that uses useSearchParams - needs to be wrapped in Suspense
function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="text"
      placeholder="Search posts..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

// Main component that wraps SearchInput in Suspense
export default function Search() {
  return (
    <div className="relative">
      <Suspense
        fallback={
          <input
            type="text"
            placeholder="Search posts..."
            disabled
            className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50"
          />
        }
      >
        <SearchInput />
      </Suspense>
    </div>
  );
}
