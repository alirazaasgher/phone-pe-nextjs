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
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function VariantImageGallery({ phone }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(phone.colors[0].name);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedColorImages = phone.colors[selectedColorIndex].images;
  const [isMobile, setIsMobile] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [direction, setDirection] = useState(0);
  const isFirstRender = useRef(true);
  const touchStartX = useRef(0);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Swipe handlers
  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    if (diff > 50) {
      // swipe right → previous image
      setDirection(-1);
      setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
    } else if (diff < -50) {
      // swipe left → next image
      setDirection(1);
      setCurrentImageIndex((prev) =>
        Math.min(prev + 1, imagesToShow.length - 1)
      );
    }
  };
  useEffect(() => {
    isFirstRender.current = false;
  }, []);
  // Images of the currently selected color
  const imagesToShow = useMemo(() => {
    const colorObj = phone.colors[selectedColorIndex];
    return colorObj?.images || [];
  }, [selectedColorIndex, phone.colors]);

  const activeSrc = selectedColorImages[currentImageIndex].url;

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

  return (
    <>
      {/* 🖼️ Main Image */}
      {/* <div
  className="
    flex flex-row-reverse md:flex-col
    items-start md:items-center
    justify-start md:justify-center
    w-full md:max-w-md
  "
>
  <div className="relative w-full aspect-[1/1] overflow-hidden group">
    <AnimatePresence>
      <motion.img
        key={`${selectedColor}-${currentImageIndex}`}
        src={activeSrc}
        alt={`${selectedColor} phone - Image ${currentImageIndex + 1}`}
        className="w-full h-full object-contain cursor-zoom-in z-10 relative"
        initial={
          isFirstRender.current
            ? false
            : { opacity: 0, x: direction > 0 ? 80 : -80 }
        }
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={() => setZoomed(true)}
      />
    </AnimatePresence>

    {imagesToShow.length > 1 && (
      <>
        <NavigationButton
          direction="left"
          onClick={prevImage}
          disabled={currentImageIndex === 0}
        />
        <NavigationButton
          direction="right"
          onClick={nextImage}
          disabled={currentImageIndex === imagesToShow.length - 1}
        />
      </>
    )}
  </div>

  {imagesToShow.length > 1 && (
    <div
      className="
        flex flex-col md:flex-row
        items-start md:items-center
        justify-start md:justify-center
        gap-2 md:gap-3
      "
    >
      <Thumbnails
        images={imagesToShow}
        active={currentImageIndex}
        onClick={(index) => {
          setDirection(index > currentImageIndex ? 1 : -1);
          setCurrentImageIndex(index);
        }}
      />
    </div>
  )}
    <ColorSelector
                    colors={phone.colors}
                    selectedColor={selectedColor}
                    onSelect={setSelectedColor}
                />
</div> */}
      {/* Image Dots */}

      <div className="flex-shrink-0 flex flex-col justify-center items-center h-full">
        <div className="relative w-[220px] h-[260px] lg:w-[200px] lg:h-[200px] flex justify-center items-center bg-white overflow-visible group">
          <AnimatePresence>
            <motion.img
              key={`${selectedColor}-${currentImageIndex}`}
              src={activeSrc || "images/default_placeholder.webp"}
              alt={`${selectedColor} phone - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain cursor-pointer mix-blend-multiply"
              initial={
                isFirstRender.current
                  ? false
                  : { opacity: 0, x: direction > 0 ? 80 : -80 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setZoomed(true)}
              drag={isMobile ? "x" : false} // <--- Enable drag on mobile
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3} // <--- Makes drag feel natural
              onDragEnd={(event, info) => {
                if (info.offset.x < -50) {
                  // Swipe left
                  nextImage();
                } else if (info.offset.x > 50) {
                  // Swipe right
                  prevImage();
                }
              }}
            />
          </AnimatePresence>

          {/* Navigation Buttons */}
          {!isMobile && imagesToShow.length > 1 && (
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

        {/* Thumbnails below the main image */}
        <div className="w-full">
          <Thumbnails
            colors={phone.colors}
            active={selectedColorIndex}
            selectedColor={selectedColor}
            onClick={(index) => {
              setSelectedColorIndex(index);
              setSelectedColor(phone.colors[index].name);
              setCurrentImageIndex(0); // reset image index for new color
            }}
          />
        </div>
      </div>
      {/* <ColorSelector
          colors={phone.colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        /> */}

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
