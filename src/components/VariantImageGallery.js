"use client";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-medium-image-zoom/dist/styles.css";
import ZoomModal from "./ZoomModel";
import NavigationButton from "./NavigationButton ";
import Dots from "./Dots";
import ColorSelector from "./ColorSelector";
import Thumbnails from "./Thumbnails";
import Image from "next/image";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function VariantImageGallery({ phone }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(phone?.colors[0]?.name);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedColorImages = phone.colors[selectedColorIndex]?.images || [];
  const [isMobile, setIsMobile] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [direction, setDirection] = useState(0);
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);
  // Images of the currently selected color
  const imagesToShow = useMemo(() => {
    const colorObj = phone.colors[selectedColorIndex];
    return colorObj?.images || [];
  }, [selectedColorIndex, phone.colors]);
  const activeSrc =
    selectedColorImages[currentImageIndex]?.url || phone.primary_image;
  // Swipe detection
  const [isDragging, setIsDragging] = useState(false);
  const nextImage = useCallback(() => {
    if (currentImageIndex < imagesToShow.length - 1) {
      setDirection(1);
      setCurrentImageIndex((i) => i + 1);
    }
  }, [currentImageIndex, imagesToShow.length]);

  const prevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex((i) => i - 1);
    }
  }, [currentImageIndex]);

  const handleThumbnailClick = useCallback(
    (index) => {
      setSelectedColorIndex(index);
      setSelectedColor(phone.colors[index].name);
      setCurrentImageIndex(0);
      setDirection(0);
    },
    [phone.colors]
  );
  const navigate = useCallback(
    (newDirection) => {
      if (newDirection === 1 && currentImageIndex < imagesToShow.length - 1) {
        setDirection(1);
        setCurrentImageIndex((prev) => prev + 1);
      } else if (newDirection === -1 && currentImageIndex > 0) {
        setDirection(-1);
        setCurrentImageIndex((prev) => prev - 1);
      }
    },
    [currentImageIndex, imagesToShow.length]
  );
  // Smooth drag end with velocity-based navigation

  return (
    <>
      <div className="flex-shrink-0 flex flex-col justify-center items-center h-full">
        <div className="relative w-[220px] h-[260px] lg:w-[200px] lg:h-[200px] flex justify-center items-center bg-white overflow-visible group">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedColor}-${currentImageIndex}`}
              className="max-w-full max-h-full cursor-pointer select-none relative w-full h-full"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              // Smooth entry/exit animations
              custom={direction}
              initial={isFirstRender.current ? false : true}
              onClick={() => !isDragging && setZoomed(true)}
              // Prevent context menu on long press
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src={activeSrc || "/images/default_placeholder.webp"}
                alt={`${selectedColor} phone - Image ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 220px, 200px"
                className="object-contain pointer-events-none"
                priority={currentImageIndex === 0 ? true : false}
                quality={85}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
          {/* Image counter at bottom-right */}
          {imagesToShow.length > 1 && (
            <div className="hidden lg:block absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1} / {imagesToShow.length}
            </div>
          )}
          {/* Navigation Buttons */}
          {imagesToShow.length > 1 && (
            <>
              <NavigationButton
                direction="left"
                onClick={() =>
                  setCurrentImageIndex((prev) => Math.max(prev - 1, 0))
                }
                disabled={currentImageIndex === 0}
              />
              <NavigationButton
                direction="right"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    Math.min(prev + 1, imagesToShow.length - 1)
                  )
                }
                disabled={currentImageIndex === imagesToShow.length - 1}
              />
            </>
          )}

          {imagesToShow.length > 1 && (
            <motion.div
              className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFirstRender.current ? [0, 1, 1, 0] : 0 }}
              transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
            >
              <div className="flex items-center gap-2 bg-black/70 text-white text-sm px-4 py-2 rounded-full">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span>Swipe</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </div>
        {imagesToShow.length > 1 && (
          <ColorSelector selectedColor={selectedColor} />
        )}

        {/* Thumbnails below the main image */}
        <div className="w-full">
          <Thumbnails
            colors={phone.colors}
            active={selectedColorIndex}
            selectedColor={selectedColor}
            onClick={handleThumbnailClick}
          />
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomed && (
        <ZoomModal
          activeSrc={activeSrc}
          current={currentImageIndex}
          total={imagesToShow.length}
          onClose={() => setZoomed(false)}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
