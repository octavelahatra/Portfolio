"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/motion/section-heading"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE } from "@/lib/motion"

export default function Skills() {
  const reducedMotion = useReducedMotion()

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

  return (
    <section id="skills" className="py-20 px-6 relative bg-card/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Savoir-faire" title="Compétences" className="mb-16" />

        <StaggerGroup className="grid md:grid-cols-3 gap-8">
          {skillsData.map((category, catIndex) => (
            <StaggerItem key={catIndex} className="glowing-border p-8">
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
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reducedMotion ? 0 : DURATION.slow,
                          delay: reducedMotion ? 0 : index * 0.1,
                          ease: EASE.out,
                        }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
