"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: "Projet IoT - Système RFID & Hikvision",
      company: "École Nationale d'Informatique - Fianarantsoa",
      period: "2024 - 2025 (En cours)",
      description: "Conception et implémentation d'un système IoT de digitalisation et de présence basé sur RFID, intégré à l'écosystème Hikvision",
      achievements: ["Intégration IoT", "Technologie RFID", "Écosystème Hikvision"],
    },
    {
      title: "Stage - Sécurisation Salle Serveur",
      company: "Ministère des Forces Armées - Antananarivo",
      period: "2023 - 2024 (3 mois)",
      description: "Conception et mise en place d'un système de sécurisation de la salle de serveur au sein du Ministère des Forces Armées Malagasy",
      achievements: ["Sécurité critique", "Infrastructure serveur", "Monitoring avancé"],
    },
    {
      title: "Stage - Système de Pointage",
      company: "Service Régional du Budget - Fianarantsoa",
      period: "2022 - 2023 (2 mois)",
      description: "Conception et mise en place d'un système de pointage au sein du Service Régional du Budget Haute Matsiatra",
      achievements: ["Gestion du personnel", "Automatisation", "Base de données"],
    },
  ]

  const certifications = [
    "Master Professionnel - Objet Connecté & Cybersécurité (en cours)",
    "Licence Pro - Électronique Appliquée & Informatique Industrielle (Mention Bien)",
    "Certification Data Science avec KNIME (IDEA)",
    "Université de Fianarantsoa",
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
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="experience" className="py-20 px-6 relative bg-card/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Expérience & Formations</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Expériences */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="md:col-span-2 space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="glowing-border p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-muted-foreground text-sm">{exp.period}</span>
                </div>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.achievements.map((achievement, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {achievement}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glowing-border p-6"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
