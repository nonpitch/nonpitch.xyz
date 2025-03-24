"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const socialLinks = [
    { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn", href: "https://linkedin.com/in/nonpitch" },
    { icon: <Github className="h-6 w-6" />, label: "GitHub", href: "https://github.com/nonpitch" },
    { icon: <Mail className="h-6 w-6" />, label: "Email", href: "mailto:pitchayapat.waree@gmail.com" },
  ]

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-20 px-4 md:px-8 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-950/10 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center "style={{ textAlign: 'justify' }}>
          <motion.div variants={itemVariants} className="space-y-6 order-2 md:order-1">
            <p className="text-lg text-gray-300">
            I’m a passionate Product Owner and a Computer Engineering (International) student @KMUTT with hands-on experience 
            in digital product development through part-time, internships and academic projects. 
            </p>
            <p className="text-lg text-gray-300">
            I believe in creating products that solve real problems while delighting users with intuitive interfaces 
            and seamless interactions, ensuring that each product I work on has a meaningful impact and benefits everyone.
            </p>
            <p className="text-lg text-gray-300">
              When I'm not working, you can find me exploring new technologies, constantly learning, and pushing the boundaries 
              of what is possible in the tech space. Aiming to make a positive difference in both the tech community and society.
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Connect With Me</h3>
              <div className="flex space-x-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="p-3 rounded-full bg-gray-900/80 border border-gray-800 text-gray-300 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all duration-300 relative">
                      {link.icon}
                      <span className="absolute inset-0 rounded-full bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </span>
                    <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="h-[450px] w-full relative rounded-xl overflow-hidden border border-gray-800 bg-black/30 backdrop-blur-sm order-1 md:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 z-0" />
            <div className="absolute inset-0 z-10">
              <img
                src="/profilepic.png"
                alt="Profile Picture"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-70" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

