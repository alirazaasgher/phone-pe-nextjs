"use client";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { ZoomIn } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
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

  return (
    <>
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="relative w-[220px] h-[260px] lg:w-[200px] lg:h-[200px] flex justify-center items-center bg-white overflow-visible group">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedColor}-${currentImageIndex}`}
              className="max-w-full max-h-full cursor-pointer select-none relative w-full h-full"
              // Smooth entry/exit animations
              custom={direction}
              initial={isFirstRender.current ? false : true}
              onClick={() => setZoomed(true)}
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
                fetchPriority={currentImageIndex === 0 ? "high" : "auto"}
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
        </div>
        {imagesToShow.length > 0 && (
          <ColorSelector selectedColor={selectedColor} />
        )}

        {/* Thumbnails below the main image */}
        <div className="w-full lg:max-w-[190px]">
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
          isOpen={zoomed}
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
