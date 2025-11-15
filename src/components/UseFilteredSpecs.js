import Fuse from "fuse.js";
import { useMemo, useEffect, useState } from "react";

function normalize(str) {
    return str
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9\s]/g, " ") // remove special chars
        .replace(/\s+/g, " ") // collapse spaces
        .trim();
}

export default function UseFilteredSpecs(phoneDetails, searchQuery) {
    const filteredSpecs = useMemo(() => {
        const specsArray = Object.values(phoneDetails.specifications || {});
        const normalize = (str) =>
            str
                ?.toString()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // remove accents
                .replace(/[^a-z0-9\s]/g, " ") // remove symbols
                .replace(/\s+/g, " ") // collapse spaces
                .trim();

        const query = normalize(searchQuery);
        if (!query) return specsArray;

        // Split query into separate words for multi-term matching
        const queryWords = query.split(" ").filter(Boolean);

        // Filter and rank
        const ranked = specsArray
            .map((section) => {
                const [category, details] =
                    Object.entries(section).find(
                        ([key]) =>
                            key !== "is_expandable" &&
                            key !== "max_visible" &&
                            key !== "security"
                    ) || [];

                if (!details || typeof details !== "object") return null;

                const cat = normalize(category);
                const text = normalize(
                    Object.entries(details)
                        .map(([k, v]) => `${k} ${v}`)
                        .join(" ")
                );

                // Check matches
                let score = 0;
                queryWords.forEach((word) => {
                    if (cat.includes(word)) score += 3; // strong match in category
                    if (text.includes(word)) score += 1; // match in values
                });

                return score > 0 ? { section, score } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .map((r) => r.section);

        return ranked;
    }, [searchQuery, phoneDetails.specifications]);
    return filteredSpecs;
}
