"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const experiences = [
    {
      role: "Product Owner",
      company: "Krungsri Nimble – Bank of Ayudhya",
      duration: "Jun 2025 - May 2026 | Cooperative",
      description:
        "to be continued...",
      technologies: ["Project Management", "Agile", "Product Strategy", "Backlog", "User Experience"],
    },
    {
      role: "Quality Assurance Engineer",
      company: "SCB – Siam Commercial Bank",
      duration: "Oct 2024 - Feb 2025 | Part-time",
      description:
        "Part of the automation team, enhancing API quality and reliability. Design and Implement automated test cases with Cypress, Postman, and Jenkins, supporting continuous integration, Identified and corrected incorrect HTTP codes, and improving test automation efficiency.",
      technologies: ["API Testing", "Automation Tools", "Cypress", "Jenkins", "Continuous Integration"],
    },
    {
      role: "Product Owner",
      company: "Makro PRO - CP AXTRA",
      duration: "Jun 2024 - Aug 2024 | Internship",
      description:
        "Led Assisted Sales MVP#3: Customer Modification Epic, enabling Sales Executives to efficiently manage client information. Handling frontend updates of the CRM system, create new request, optimized backend operations, employee structure, and streamlined approval flows.",
      technologies: ["Product Development", "A/B Testing", "Jira", "Agile", "Project Planning"],
    },
    {
      role: "Co-Founder & President",
      company: "Ektra Coding Club - Sarasas Ektra School",
      duration: "May 2020 - Aug 2022",
      description:
        "Shared programming skills with children in lower secondary and primary school. Led the workshops, activities, and competitions to teach coding, empowering kids to develop their coding abilities through engaging and hands-on experiences.",
      technologies: ["Leadership", "Educational", "M-bot Hardware", "Competitions", "Game Development"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" ref={ref} className="relative min-h-screen py-20 px-4 md:px-8 flex items-center" style={{ textAlign: 'justify' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-blue-950/10 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Experience
        </motion.h2>

        <div className="space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 opacity-30" />
              )}

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xl font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <span className="text-sm text-gray-400">{exp.duration}</span>
                    </div>
                    <h4 className="text-lg text-cyan-400 mb-4">{exp.company}</h4>
                    <p className="text-gray-300 mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          className="bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

