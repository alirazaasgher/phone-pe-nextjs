"use client";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import 'react-medium-image-zoom/dist/styles.css';
import ZoomModal from "./ZoomModel";
import NavigationButton from "./NavigationButton ";
import Dots from "./Dots";
import ColorSelector from "./ColorSelector";
import Thumbnails from "./Thumbnails";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function VariantImageGallery({ phone }) {
    const [selectedColor, setSelectedColor] = useState(phone.colors[0].name);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [direction, setDirection] = useState(0);
    const isFirstRender = useRef(true);
    useEffect(() => {
        isFirstRender.current = false;
    }, []);
    const imagesToShow = useMemo(() => {
        const colorObj = phone.colors.find((c) => c.name === selectedColor);
        return colorObj?.images || [];
    }, [selectedColor, phone.colors]);

    const activeSrc = imagesToShow[currentImageIndex]?.url;

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






             <div className="w-full">
      <div className="flex flex-col items-center w-full max-w-md mx-auto group">
       
        <div className="relative w-[250px] h-[250px] lg:w-[200px] lg:h-[200px] overflow-hidden aspect-square overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.img
          key={`${selectedColor}-${currentImageIndex}`}
          src={activeSrc}
          alt={`${selectedColor} phone - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-contain cursor-pointer"
          initial={isFirstRender.current ? false : { opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={() => setZoomed(true)}
        />
      </AnimatePresence>

      {/* Image Counter */}
      {imagesToShow.length > 1 && (
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {currentImageIndex + 1} / {imagesToShow.length}
        </div>
      )}

      {/* Navigation Buttons */}
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
          <Thumbnails
            images={imagesToShow}
            active={currentImageIndex}
            colors={phone.colors}
          selectedColor={selectedColor}
            onClick={(index) => {
              setDirection(index > currentImageIndex ? 1 : -1);
              setCurrentImageIndex(index);
            }}
          />
        )}

        <ColorSelector
          colors={phone.colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>
    </div>
              
            {/* Zoom Modal */}
            {
                zoomed && (
                    <ZoomModal
                        activeSrc={activeSrc}
                        current={currentImageIndex}
                        total={imagesToShow.length}
                        onClose={() => setZoomed(false)}
                        onPrev={prevImage}
                        onNext={nextImage}
                    />
                )
            }
        </>

    );
}
