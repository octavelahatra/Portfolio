"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone } from "lucide-react"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>

      <motion.div
        ref={ref}
        className="w-full px-6 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          {/* Top section - Name with Profile Image */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
          >
            <div className="flex-1">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold gradient-text leading-tight mb-2"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                RAZAFINDRAZAKA
              </motion.h1>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold gradient-text leading-tight"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                Fitahinasoa Lahatra Octave
              </motion.h1>
            </div>

            {/* Profile Image with animation */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="relative flex-shrink-0"
            >
              <motion.img
                src="/profile.png"
                alt="RAZAFINDRAZAKA Fitahinasoa Lahatra Octave"
                className="w-96 h-96 md:w-[500px] md:h-[500px] relative z-10 object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Welcome badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
              ✨ Bienvenue dans mon univers
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight"
          >
            Ingénieur Innovant
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
            Électronique Appliquée • Informatique Industrielle • Intelligence Artificielle
          </motion.p>

          <motion.p variants={itemVariants} className="text-muted-foreground mb-8 text-base md:text-lg">
            Je transforme des idées en solutions innovantes. Spécialisé en systèmes embarqués, applications web et
            vision par ordinateur.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a
                href="mailto:octavelahatra@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                octavelahatra@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a
                href="https://wa.me/261348672838"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                +261 34 86 728 38 (WhatsApp)
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all text-center"
            >
              Voir mes projets
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all text-center"
            >
              Me contacter
            </motion.a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="mt-16 flex justify-center"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
