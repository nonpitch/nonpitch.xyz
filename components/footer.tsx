"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "https://linkedin.com/in/nonpitch" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/nonpitch" },
    { icon: <Mail className="h-5 w-5" />, label: "Email", href: "mailto:pitchayapat.waree@gmail.com" },
  ]

  return (
    <footer className="relative py-12 px-4 md:px-8 border-t border-gray-800">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500">
              nonpitch.xyz
            </h2>
            <p className="text-gray-400 mt-2">Product Owner | Technologist | Innovator</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors duration-300"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              </Button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-gray-800 text-center"
        >
          <p className="text-gray-500 text-sm">© {currentYear} nonpitch. All rights reserved.</p>
          <div className="mt-2">
            <span className="inline-block h-1 w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 rounded-full"></span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

