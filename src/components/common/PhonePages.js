"use client";
import { useState, useRef, useEffect, useMemo } from "react";
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
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width <= 550) {
        setItemsPerPage(2);
      } else if (width > 550 && width < 650) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(2); // or 4 if you want for larger screens
      }
    };

    updateItemsPerPage(); // initial run
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);
  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < phones.length; i += itemsPerPage) {
      result.push(phones.slice(i, i + itemsPerPage));
    }
    return result;
  }, [phones, itemsPerPage]);
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
      },
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
        className="sm:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth gap-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {pages.map((pageCards, page) => (
          <div
            key={page}
            data-index={page}
            ref={(el) => (itemsRef.current[page] = el)}
            className="snap-center w-full flex-shrink-0 flex"
          >
            {pageCards.map((phone, idx) => {
              // width based on itemsPerPage
              const widthClass = itemsPerPage === 3 ? "w-1/3" : "w-1/2";

              // padding logic
              let paddingClass = "";
              if (itemsPerPage === 3) {
                if (idx === 0) paddingClass = "pr-1";
                else if (idx === 1) paddingClass = "px-1";
                else paddingClass = "pl-1";
              } else {
                paddingClass = idx === 0 ? "pr-1" : "pl-1";
              }

              // remove right padding for last item of last page
              if (page === pages.length - 1 && idx === pageCards.length - 1) {
                paddingClass = paddingClass.replace(/pr-1|px-1/, "");
              }

              return (
                <div key={phone.id} className={`${widthClass} ${paddingClass}`}>
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
              );
            })}
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
