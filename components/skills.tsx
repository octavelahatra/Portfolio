"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillsData = [
    {
      category: "Électronique",
      skills: [
        { name: "ESP32/Arduino", level: 95 },
        { name: "Circuit design", level: 90 },
        { name: "IoT & Capteurs", level: 92 },
        { name: "Programmation embarquée", level: 93 },
      ],
    },
    {
      category: "Informatique",
      skills: [
        { name: "React & Next.js", level: 94 },
        { name: "TypeScript", level: 92 },
        { name: "Bases de données", level: 88 },
        { name: "Architecture web", level: 90 },
      ],
    },
    {
      category: "Intelligence Artificielle",
      skills: [
        { name: "Vision par ordinateur", level: 88 },
        { name: "Deep Learning (TensorFlow)", level: 86 },
        { name: "Python & PyTorch", level: 91 },
        { name: "Automatisation IA", level: 87 },
      ],
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
    <section id="skills" className="py-20 px-6 relative bg-card/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Compétences</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillsData.map((category, catIndex) => (
            <motion.div key={catIndex} variants={itemVariants} className="glowing-border p-8">
              <h3 className="text-2xl font-bold mb-8 text-primary">{category.category}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-foreground">{skill.name}</span>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
