"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const timelineItems = [
    {
      year: "2023-2024",
      title: "Licence Professionnelle - Mention Bien",
      description: "Électronique Appliquée et Informatique Industrielle - Faculté des Sciences, Université de Fianarantsoa",
    },
    {
      year: "2024-2025",
      title: "Master Professionnel (en cours)",
      description: "Objet Connecté et Cybersécurité - École Nationale d'Informatique, Université de Fianarantsoa",
    },
    {
      year: "2024-2025",
      title: "Certification Data Science",
      description: "Formation avec KNIME, organisée par IDEA - École Nationale d'Informatique",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">À propos de moi</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              Étudiant en Master Professionnel spécialisé en Objet Connecté et Cybersécurité à l'École Nationale 
              d'Informatique de Fianarantsoa, je combine une solide formation académique avec une expérience pratique 
              dans le développement de solutions innovantes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              Diplômé avec mention Bien en Licence Professionnelle d'Électronique Appliquée et Informatique Industrielle, 
              je maîtrise l'ensemble de la chaîne de création : de la conception de circuits électroniques aux applications 
              web intelligentes, en passant par les systèmes IoT et la cybersécurité.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              Mes expériences incluent la sécurisation d'infrastructures critiques au Ministère des Forces Armées, 
              le développement de systèmes de pointage pour le Service Régional du Budget, et actuellement un projet 
              de digitalisation basé sur RFID intégré à l'écosystème Hikvision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glowing-border p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Domaines d'expertise</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Systèmes embarqués & IoT (ESP32, Arduino, RFID)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span>Électronique appliquée & capteurs intelligents</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span>Développement web (React, Next.js, TypeScript)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Cybersécurité & sécurisation d'infrastructures</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span>Data Science & analyse de données (KNIME)</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
          <h3 className="text-3xl font-bold mb-12 text-center gradient-text">Parcours Académique</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            {timelineItems.map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                className="glowing-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white flex-shrink-0 shadow-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
