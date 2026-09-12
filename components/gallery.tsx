"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { ImageReveal } from "@/components/motion/image-reveal"
import { SectionHeading } from "@/components/motion/section-heading"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  const galleryImages = [
    { id: 1, title: "Circuit ESP32", category: "Électronique", image: "/esp32-circuit-board-design.jpg" },
    { id: 2, title: "Interface Web", category: "Web", image: "/modern-web-dashboard-interface.jpg" },
    { id: 3, title: "Vision IA", category: "IA", image: "/ai-computer-vision-processing.jpg" },
    { id: 4, title: "Prototype IoT", category: "IoT", image: "/iot-smart-device-prototype.jpg" },
    { id: 5, title: "Dashboard Analytics", category: "Web", image: "/real-time-analytics-dashboard.jpg" },
    { id: 6, title: "Système Automatisé", category: "Électronique", image: "/automated-control-system.jpg" },
  ]

  return (
    <section id="gallery" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Réalisations" title="Galerie & Réalisations" className="mb-16" />

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <StaggerItem
              key={image.id}
              variant="scale"
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden glowing-border" onClick={() => setSelectedImage(image.id)}>
                <ImageReveal className="h-full w-full">
                  <img
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </ImageReveal>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <p className="text-primary text-sm font-semibold">{image.category}</p>
                    <h3 className="text-foreground font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages.find((img) => img.id === selectedImage)?.image || "/placeholder.svg"}
                alt="Preview"
                className="w-full rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-primary hover:text-accent transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
