"use client";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { ZoomIn } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform,useSpring  } from "framer-motion";
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

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { 
    stiffness: 300, 
    damping: 30,
    mass: 0.5 
  });
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = useTransform(smoothX, [-200, 0, 200], [0.95, 1, 0.95]);
  const rotate = useTransform(smoothX, [-200, 0, 200], [-3, 0, 3]);

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

  const handleThumbnailClick = useCallback((index) => {
    setSelectedColorIndex(index);
    setSelectedColor(phone.colors[index].name);
    setCurrentImageIndex(0);
    setDirection(0);
  }, [phone.colors]);

  // Preload next/previous images
  // useEffect(() => {
  //   if (imagesToShow.length <= 1) return;

  //   const preloadImages = [];

  //   // Preload next image
  //   if (currentImageIndex < imagesToShow.length - 1) {
  //     const nextImg = new Image();
  //     nextImg.src = imagesToShow[currentImageIndex + 1];
  //     preloadImages.push(nextImg);
  //   }

  //   // Preload previous image
  //   if (currentImageIndex > 0) {
  //     const prevImg = new Image();
  //     prevImg.src = imagesToShow[currentImageIndex - 1];
  //     preloadImages.push(prevImg);
  //   }

  //   return () => {
  //     preloadImages.forEach(img => {
  //       img.src = '';
  //     });
  //   };
  // }, [currentImageIndex, imagesToShow]);
  const navigate = useCallback((newDirection) => {
    if (newDirection === 1 && currentImageIndex < imagesToShow.length - 1) {
      setDirection(1);
      setCurrentImageIndex(prev => prev + 1);
    } else if (newDirection === -1 && currentImageIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(prev => prev - 1);
    }
  }, [currentImageIndex, imagesToShow.length]);
  // Smooth drag end with velocity-based navigation
  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    
    // More responsive thresholds for smoother UX
    const swipeThreshold = 30; // Lower = more sensitive
    const swipeVelocity = 300;  // Lower = more sensitive to fast swipes
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Check velocity first for quick swipes, then check distance
    if (Math.abs(velocity) > swipeVelocity || Math.abs(offset) > swipeThreshold) {
      if (offset > 0 || velocity > 0) {
        navigate(-1); // Swipe right = previous
      } else {
        navigate(1);  // Swipe left = next
      }
    }
  }, [navigate]);

  return (
    <>
      <div className="flex-shrink-0 flex flex-col justify-center items-center h-full">
        <div className="relative w-[220px] h-[260px] lg:w-[200px] lg:h-[200px] flex justify-center items-center bg-white overflow-visible group">
          <AnimatePresence mode="wait">
           <motion.div
            key={`${selectedColor}-${currentImageIndex}`}
            className="max-w-full max-h-full cursor-pointer select-none relative w-full h-full"
            
            // Smooth swipe with spring physics
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3} // More elastic feel
            dragTransition={{ 
              bounceStiffness: 500, 
              bounceDamping: 30,
              power: 0.2 
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            
            // Smooth transformations during drag
            style={{ 
              x: smoothX,
              opacity: isDragging ? opacity : 1,
              scale: isDragging ? scale : 1,
              rotate: isDragging ? rotate : 0,
              touchAction: 'pan-y',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            
            // Smooth entry/exit animations
            custom={direction}
            initial={
              isFirstRender.current
                ? false
                : { 
                    opacity: 0, 
                    x: direction > 0 ? 120 : -120,
                    scale: 0.9
                  }
            }
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              x: direction > 0 ? -120 : 120,
              scale: 0.9
            }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 25,
              mass: 0.8
            }}
            
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Swipe</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
