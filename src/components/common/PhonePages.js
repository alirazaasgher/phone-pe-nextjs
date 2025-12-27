"use client";
import { useState, useRef, useEffect } from "react";
import PhoneCard from "../PhoneCard";
import MobileCompetitors from "./MobileCompetitors";
export default function PhonePages({
  phones,
  phoneDetails,
  fromCompetitor = false,
  iconMap = false,
  fromDetailsPage = false,
  phoneSlug = "",
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [];
  for (let i = 0; i < phones.length; i += 2) {
    pages.push(phones.slice(i, i + 2));
  }
  const itemsRef = useRef([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setPageIndex(index);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6, // 60% visible = active panel
      }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pages]);
  return (
    <>
      <div
        ref={scrollContainerRef}
        className="sm:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {pages.map((pageCards, page) => (
          <div
            key={page}
            data-index={page}
            ref={(el) => (itemsRef.current[page] = el)}
            className="snap-center w-full flex-shrink-0 flex"
          >
            {pageCards.map((phone, idx) => (
              <div
                key={phone.id}
                className={`w-1/2 ${idx === 0 ? "pr-1" : "pl-1"}`}
              >
                {fromCompetitor ? (
                  <MobileCompetitors
                    competitorPhone={phone}
                    phoneDetails={phoneDetails}
                    iconMap={iconMap}
                  />
                ) : (
                  <PhoneCard
                    phone={phone}
                    isPriority={false}
                    fromCompare={false}
                    removePhone={""}
                    fromDetailsPage={fromDetailsPage}
                    phoneSlug={phoneSlug}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="flex justify-center gap-1 mt-2 sm:hidden">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-150 ${
                pageIndex === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
