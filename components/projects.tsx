"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const projectsData = [
    {
      id: 1,
      title: "Système de Sécurisation IoT",
      description: "Système avancé de sécurisation de salle serveur avec capteurs connectés",
      technologies: ["ESP32", "IoT", "Python", "React", "Base de données"],
      image: "/iot-security-system-with-sensors.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Application Web Industrielle",
      description: "Plateforme de monitoring et contrôle pour systèmes industriels",
      technologies: ["Next.js", "TypeScript", "WebSocket", "PostgreSQL"],
      image: "/industrial-monitoring-dashboard.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Vision par Ordinateur",
      description: "Système de reconnaissance et analyse d'images en temps réel",
      technologies: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
      image: "/computer-vision-ai-system.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Drone Autonome",
      description: "Drone avec système de navigation autonome et capteurs",
      technologies: ["Arduino", "C++", "Capteurs", "Contrôle"],
      image: "/autonomous-drone-with-sensors.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Smart Home Hub",
      description: "Contrôle centralisé pour domotique avec IA d'apprentissage",
      technologies: ["ESP32", "IoT", "Machine Learning", "Mobile"],
      image: "/smart-home-automation-hub.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "Analyse de Données industrielle",
      description: "Plateforme de Big Data pour l'analyse temps réel",
      technologies: ["Python", "Machine Learning", "Spark", "Grafana"],
      image: "/industrial-data-analytics-platform.jpg",
      link: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Mes projets</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group glowing-border overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-64 overflow-hidden bg-card/50">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-primary/10 border border-primary/30 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                >
                  Voir plus
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
