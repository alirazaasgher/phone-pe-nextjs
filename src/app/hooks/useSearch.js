"use client";
import { useState, useMemo } from "react";

export default function useSearch(data) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQ = query.toLowerCase();

    return data.filter((item) =>
      item.model.toLowerCase().includes(lowerQ) ||
      item.brand.toLowerCase().includes(lowerQ)
    );
  }, [query, data]);
  const suggestions = useMemo(() => filtered.slice(0, 5), [filtered]);

  return {
    query,
    setQuery,
    filtered,
    suggestions,
    showSuggestions,
    setShowSuggestions,
  };
}
