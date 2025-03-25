"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Trophy, Medal } from "lucide-react"

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const awards = [
    {
      title: "Outstanding Thai National Youth Award",
      organization: "Minister of Education of Thailand",
      year: "2022",
      description: "One of my proudest, to be called 'เยาวชนดีเด่น', looking forward to continuing my endeavors.",
      icon: <Trophy className="h-8 w-8" />,
      highlight: true,
    },
    {
      title: "Mental Health Hackathon",
      organization: "KMUTT",
      year: "2024",
      description: "Semi-Finalists: MindMate, mental health application supporting people with challenges like depression.",
      icon: <Award className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "Gosoft Retail Tech Hackathon",
      organization: "Gosoft (Thailand) Co., Ltd.",
      year: "2023",
      description: "Semi-Finalists: Prompt 7-Eleven!, AI-driven solution to modernize convenience store shopping.",
      icon: <Award className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "Makathon - Hackathon by Makro",
      organization: "Siam Makro Company Limited",
      year: "2023",
      description: "Finalists: Show Pro, intelligent Stock Management and POS System for small businesses.",
      icon: <Award className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "BMA x FREC | Scale Our Impact",
      organization: "Bangkok Metropolitan Administration",
      year: "2023",
      description: "Finalists: Urbanlink, app that aimed to revitalize aging structures and help community development.",
      icon: <Award className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "Dtac Young Safe Internet Leader",
      organization: "Dtac & Plan International (Thailand)",
      year: "2021",
      description: "Funding: Awarded a 10,000 baht grant for R&D focused on cybersecurity awareness.",
      icon: <Award className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "Trivia Quiz Competition",
      organization: "Sarasas Ektra School",
      year: "2020",
      description: "First Prize: Gain opportunity to showcase knowledge and understanding of royal initiatives.",
      icon: <Medal className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "Educational Media Competition",
      organization: "Sarasas Ektra School",
      year: "2020",
      description: "Gold Medal: Designing & building a board game to make learning Astronomy an exciting adventure.",
      icon: <Medal className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "CAIC - The Future of AI",
      organization: "Creative Artificial Intelligence by CP ALL PCL.",
      year: "2020",
      description: "Second Runner-Up: Scholarship worth 10,000 baht for designing Nutrition Advisory Software.",
      icon: <Medal className="h-8 w-8" />,
      highlight: false,
    },
    {
      title: "Samsung Innovation Hackathon",
      organization: "Samsung Electronics Korea and JA Thailand",
      year: "2019",
      description: "Second Runner-Up: Scholarship worth 10,000 baht with Nullus, an Environmental Awareness App.",
      icon: <Medal className="h-8 w-8" />,
      highlight: false,
    }
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
    <section id="awards" ref={ref} className="relative min-h-screen py-20 px-4 md:px-8 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-black z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
        >
          Honors & Awards
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {awards.map((award, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <div
                className={`h-full p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group
                  ${
                    award.highlight
                      ? "bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-purple-500/50 hover:border-purple-400"
                      : "bg-gray-900/40 border-gray-800 hover:border-cyan-500/50"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-full ${award.highlight ? "bg-purple-500/20 text-purple-400" : "bg-gray-800 text-cyan-400"}`}
                  >
                    {award.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold mb-1 group-hover:text-cyan-400 transition-colors duration-300 ${award.highlight ? "text-purple-300" : "text-white"}`}
                    >
                      {award.title}
                    </h3>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-400">{award.organization}</p>
                      <span className={`text-sm ${award.highlight ? "text-purple-300" : "text-cyan-400"}`}>
                        {award.year}
                      </span>
                    </div>
                    <p className="text-gray-300">{award.description}</p>
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

