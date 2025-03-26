"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Awards from "@/components/awards"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import ParticleBackground from "@/components/particle-background"
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <ParticleBackground />

      <div className="relative z-10">
        <motion.div style={{ opacity, scale }} className="fixed inset-0 pointer-events-none z-0" />

        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Awards />
        <Footer />
        <Analytics/>
      </div>
    </main>
  )
}

