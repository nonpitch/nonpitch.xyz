"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, BookOpen, Building } from "lucide-react"

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const education = [
    {
      school: "King Mongkut's University of Technology Thonburi",
      degree: "Bachelor of Engineering, Department of Computer Engineering (International Program)",
      years: "2022 - 2026",
      gpa: "3.03",
      icon: <GraduationCap className="h-8 w-8" />,
    },
    {
      school: "Sarasas Ektra School",
      degree: "Science-Math and Technology Program, Global Assessment Certificate Class",
      years: "2007 - 2022",
      gpa: "3.92",
      icon: <BookOpen className="h-8 w-8" />,
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
    <section id="education" ref={ref} className="relative min-h-screen py-20 px-4 md:px-8 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-black to-cyan-950/10 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
        >
          Education
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 opacity-30" />

            <div className="space-y-12">
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants} className="flex gap-6">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-cyan-400">
                        {edu.icon}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow pt-2">
                    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {edu.school}
                        </h3>
                        <span className="text-sm text-gray-400">{edu.years}</span>
                      </div>
                      <h4 className="text-lg text-blue-400 mb-2">{edu.degree}</h4>
                      {edu.gpa && (
                        <p className="text-gray-300">
                          GPAX: <span className="text-cyan-300">{edu.gpa}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

