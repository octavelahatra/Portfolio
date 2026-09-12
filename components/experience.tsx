"use client"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/motion/section-heading"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"

export default function Experience() {
  const experiences = [
    {
      title: "Projet IoT - Système RFID & Hikvision",
      company: "École Nationale d’Informatique - Fianarantsoa",
      period: "2024 - 2025 (En cours)",
      description:
        "Conception et implémentation d’un système IoT de digitalisation et de présence basé sur RFID, intégré à l’écosystème Hikvision",
      achievements: ["Intégration IoT", "Technologie RFID", "Écosystème Hikvision"],
    },
    {
      title: "Stage - Sécurisation Salle Serveur",
      company: "Ministère des Forces Armées - Antananarivo",
      period: "2023 - 2024 (3 mois)",
      description:
        "Conception et mise en place d’un système de sécurisation de la salle de serveur au sein du Ministère des Forces Armées Malagasy",
      achievements: ["Sécurité critique", "Infrastructure serveur", "Monitoring avancé"],
    },
    {
      title: "Stage - Système de Pointage",
      company: "Service Régional du Budget - Fianarantsoa",
      period: "2022 - 2023 (2 mois)",
      description: "Conception et mise en place d’un système de pointage au sein du Service Régional du Budget Haute Matsiatra",
      achievements: ["Gestion du personnel", "Automatisation", "Base de données"],
    },
  ]

  const certifications = [
    "Master Professionnel - Objet Connecté & Cybersécurité (en cours)",
    "Licence Pro - Électronique Appliquée & Informatique Industrielle (Mention Bien)",
    "Certification Data Science avec KNIME (IDEA)",
    "Université de Fianarantsoa",
  ]

  return (
    <section id="experience" className="py-20 px-6 relative bg-card/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Parcours" title="Expérience & Formations" className="mb-16" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Expériences */}
          <StaggerGroup className="md:col-span-2 space-y-6">
            {experiences.map((exp, index) => (
              <StaggerItem key={index} className="glowing-border p-6">
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
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Certifications */}
          <Reveal variant="slide-left" delay={0.1} className="glowing-border p-6">
            <h3 className="text-2xl font-bold mb-6 text-primary">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">{cert}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
