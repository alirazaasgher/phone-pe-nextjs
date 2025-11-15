import { ChevronLeft, ChevronRight,X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Dots from "./Dots";
export default function ZoomModal({ activeSrc, current, total, onClose, onPrev, onNext }) {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                <div
                    className="relative flex items-center justify-center max-h-[90vh] max-w-[90vw]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {current > 0 && (
                        <button
                            onClick={onPrev}
                            className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-md transition-all z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    <motion.img
                        key={activeSrc}
                        src={activeSrc}
                        alt="Zoomed view"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
                        draggable="false"
                    />

                    {current < total - 1 && (
                        <button
                            onClick={onNext}
                            className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-md transition-all z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
                    <Dots count={total} active={current} onClick={() => { }} />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}