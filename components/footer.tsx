"use client"

import { Github, Linkedin, Mail, Facebook } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 px-6 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-primary font-bold mb-4">Portfolio</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">
                  Projets
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-4">Expertise</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Électronique</li>
              <li>Web Development</li>
              <li>Intelligence Artificielle</li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-4">Certifications</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Expert IoT</li>
              <li>Deep Learning</li>
              <li>Cloud Architecture</li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground text-sm mb-4">
              <p>Email: octavelahatra@gmail.com</p>
              <p>Localisation: Madagascar</p>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/octavelahatra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/lahatra-octave-razafindrazaka-5b2243285/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://web.facebook.com/lahatra.octave/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:octavelahatra@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Tous droits réservés. Créé avec ❤️ et passion.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
