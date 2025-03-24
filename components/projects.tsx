"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const scrollPositionRef = useRef(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  // Calculate scrollbar width on mount
  useEffect(() => {
    // Create a div with a scrollbar
    const scrollDiv = document.createElement("div")
    scrollDiv.style.width = "100px"
    scrollDiv.style.height = "100px"
    scrollDiv.style.overflow = "scroll"
    scrollDiv.style.position = "absolute"
    scrollDiv.style.top = "-9999px"
    document.body.appendChild(scrollDiv)

    // Calculate the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    setScrollbarWidth(scrollbarWidth)

    // Clean up
    document.body.removeChild(scrollDiv)
  }, [])

  // Check if component is mounted (for portal)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      // Save the current scroll position in the ref
      scrollPositionRef.current = window.scrollY

      // Get the current padding right
      const currentPaddingRight = Number.parseInt(getComputedStyle(document.body).paddingRight, 10) || 0

      // Add styles to prevent scrolling but maintain position
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
      document.body.classList.add("modal-open")
    } else {
      // Remove the styles
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      document.body.classList.remove("modal-open")

      // Restore scroll position using the ref value
      setTimeout(() => {
        window.scrollTo(0, scrollPositionRef.current)
      }, 0)
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      document.body.classList.remove("modal-open")
    }
  }, [selectedProject, scrollbarWidth])

  // Add global styles for modal
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement("style")
    styleEl.setAttribute("id", "modal-styles")

    // Add styles to ensure modal is always on top and cursor works
    styleEl.textContent = `
    .modal-backdrop {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 99999 !important;
      background-color: rgba(0, 0, 0, 0.8) !important;
      backdrop-filter: blur(8px) !important;
      cursor: none !important;
    }
    
    body.modal-open {
      overflow: hidden !important;
    }
    
    .modal-content {
      z-index: 100000 !important;
      position: relative !important;
      cursor: none !important;
    }
    
    .modal-content button,
    .modal-content a,
    .modal-backdrop * {
      cursor: none !important;
    }
  `

    // Append to head
    document.head.appendChild(styleEl)

    // Cleanup
    return () => {
      const existingStyle = document.getElementById("modal-styles")
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  const allProjects = [
    // Page 1 Projects
    {
      title: "Nullus Application",
      description:
        "An application designed to address the growing concerns surrounding air quality, PM 2.5, and UV radiation to protect users by providing real-time warnings about environmental hazards.",
      tags: ["#AirQuality", "#UVProtection", "#ClimateTech", "#ProtectYourHealth", "#LifeSafety"],
      details:
        "An application designed to address the growing concerns surrounding air quality, PM 2.5, and UV radiation to protect users by providing real-time warnings about environmental hazards and offering personalized advice on how to prepare for outdoor conditions. By continuously monitoring environmental factors, Nullus tracks key pollutants like PM 2.5, ozone levels, and UV radiation, sending tailored alerts to users based on the current state of their environment. These alerts help users stay informed about potential risks, empowering them to make informed decisions about when to stay indoors or take protective measures. The app offers practical recommendations on how to minimize exposure, such as wearing masks, sunscreen, or other protective gear. With these personalized notifications, Nullus not only raises awareness about the dangers of environmental pollution but also helps users protect their health and well-being. Whether it's avoiding high levels of pollution or preparing for intense UV radiation, Nullus ensures that users are always prepared for the challenges presented by their environment, promoting a safer and healthier lifestyle.",
      image: "/samsung.jpeg",
    },
    {
      title: "Nutrition Advisory Software",
      description:
        "A platform developed to optimize and personalize nutrition plans for elderly individuals & nutritionists. NAS provides a solution that addresses their health requirements and ensures a balanced lifestyle.",
      tags: ["#ElderlyCare", "#PersonalizedDiet", "#HealthTech", "#NutritionManagement", "#DietaryPlans"],
      details:
        "A platform developed to optimize and personalize nutrition plans for elderly individuals & nutritionists. NAS provides a solution that addresses their health requirements and ensures a balanced lifestyle. The app uses advanced algorithms to generate tailored nutrition plans based on individual health profiles, dietary preferences, and any specific medical conditions, such as diabetes or heart disease. These personalized recommendations are crafted to support health, improve well-being, and reduce the risk of diet-related health issues. For elderly individuals, NAS offers a user-friendly interface that makes it easy to track their daily nutrition intake and manage dietary restrictions. For nutritionists, the app provides tools to assess client needs, monitor progress, and adjust meal plans accordingly. Whether it's adjusting protein intake, managing salt levels, or ensuring adequate vitamin consumption, NAS empowers both individuals and professionals to make informed decisions about nutrition. By offering personalized, science-backed advice, we helps users achieve a healthier, more balanced life, ultimately improving quality of life for elderly individuals while assisting nutritionists in delivering the best care possible.",
      image: "/nas.jpeg",
    },
    {
      title: "Urbanlink Application",
      description:
        "An innovative application designed to empower individuals, businesses, and communities to revitalize aging structures and transform them into thriving retail spaces, shops, and cafes.",
      tags: ["#UrbanRenewal", "#SustainableDesign", "#Community", "#SmartCitiesDevelopment", "#LocalContractors"],
      details:
        "An innovative application designed to empower individuals, businesses, and communities to revitalize aging structures and transform them into thriving retail spaces, shops, and cafes. Our project focuses on giving old buildings a new purpose, breathing fresh life into underused spaces while maintaining the unique charm of neighborhoods. As a catalyst for urban renewal, Urbanlink fosters economic growth by facilitating the renovation of historical or outdated properties into modern, functional spaces that attract businesses and consumers alike. The application serves as a comprehensive platform that connects users with essential resources such as local contractors, architects, and sustainable building material suppliers, ensuring a smooth and efficient renovation process. With a focus on sustainability, Urbanlink encourages eco-friendly building practices that not only preserve the cultural heritage of communities but also support long-term environmental goals. Through its user-friendly interface, the app streamlines the entire renovation journey, from initial planning and budgeting to sourcing materials and completing construction. Whether it's turning an old warehouse into a trendy cafe or transforming a historic building into a vibrant retail hub, Urbanlink helps unlock the potential of urban spaces, contributing to the growth and revitalization of communities.",
      image: "/urbanlink.jpeg",
    },
    {
      title: "M-Bot Football in Space Competition",
      description:
        "A hands-on learning event organized to teach students programming and robot control using the Mbot platform. The workshop aimed to familiarize secondary students with the Mbot hardware.",
      tags: ["#Mbot", "#RoboticsEducation", "#STEMLearning", "#EducationalCompetition", "#BasicProgramming"],
      details:
        "A hands-on learning event organized to teach students programming and robot control using the Mbot platform. The workshop aimed to familiarize secondary students with the Mbot hardware, including its components, sensors, and actuators, which form the foundation for effective programming. I was responsible for planning the event, creating the curriculum, and gathering the necessary materials, such as Mbot kits and programming software. During the workshop, I led instructional sessions, guiding students through programming exercises and troubleshooting challenges. The competition portion tested their newly acquired skills by having them program their robots to navigate obstacles and complete tasks. One challenge was managing the diverse skill levels of the participants, which I addressed by tailoring the content to suit both beginners and more advanced students. Time management was another hurdle, as balancing theory and practice required careful planning to avoid overwhelming the students. This experience helped me strengthen my leadership, problem-solving, and communication skills. Seeing students successfully grasp programming concepts and engage with robotics was incredibly rewarding and reinforced my passion for teaching and promoting STEM education.",
      image: "/mbot.jpeg",
    },
    {
      title: "Flappy Bird Game Workshop",
      description:
        "Organized and led the Say Hello Junior Workshop, aimed at introducing primary school students to coding using Scratch 2, a visual programming language designed for coding beginners.",
      tags: ["#CodingForKids", "#Programming", "#LogicalThinking", "#YouthTechEducation", "#GameDevelopment"],
      details:
        "Organized and led the Say Hello Junior Workshop, aimed at introducing primary school students to coding using Scratch 2, a visual programming language designed for coding beginners. The workshop focus was on teaching the fundamentals of coding through an interactive and intuitive platform. Scratch 2 provides a hands-on approach that encourages creativity and logical thinking, making it ideal for young learners. During the workshop, I guided students through the creation of the Flappy Bird Game, a popular and engaging project that allowed students to apply their coding skills in a fun and creative way. The game served as a canvas for them to explore key programming concepts such as loops, conditional statements, and event handling. To ensure each student received the support they needed, I divided them into small groups. This allowed our team to provide individualized guidance, ensuring that every student could work at their own pace and fully grasp the concepts. The workshop not only helped the students understand the basics of coding but also fostered teamwork, problem-solving, and creativity, all while making learning an enjoyable experience.",
      image: "/flappybird.jpeg",
    },
    {
      title: "Weekly Knowledge Board",
      description:
        "Organized the Knowledge Board on flowcharts to provide students with an understanding of this essential coding tool. Branching out into key aspects like its types, symbols, and best practices.",
      tags: ["#ProgrammingBasics", "#InteractiveLearning", "#CodingTools", "#STEMLearn", "#LearnToCode"],
      details:
        "Organized the Knowledge Board on flowcharts to provide students with a comprehensive understanding of this essential coding tool. The central concept of flowcharts served as the starting point, branching out into key aspects like types of flowcharts, symbols, and best practices. Each section was carefully designed to include detailed topics, resources, and examples, offering students various perspectives and approaches to understanding flowcharts. To encourage active learning, I incorporated areas where students could share their own flowchart examples and ask questions. This interactive element promoted engagement and facilitated peer-to-peer learning. The types of flowcharts section covered different kinds, such as process, decision, and data flow diagrams, while the symbols section explained the standardized shapes used in flowchart creation, like rectangles for processes and diamonds for decisions. The best practices section offered tips on making flowcharts clear and efficient. By presenting this information in a visual and structured way, the board not only clarified complex coding concepts but also sparked students' interest in coding. It provided them with a clear, visual learning path that encouraged both exploration and practical application of the concepts.",
      image: "/weeklyboard.jpg",
    },
    // Page 2 Projects
    {
      title: "Mindmate Application",
      description:
        "All-in-one mental health support platform thoughtfully designed to empower individuals facing emotional and psychological challenges such as depression, anxiety, or loneliness.",
      tags: ["#SelfCareTools", "#PeerSupport", "#AnxietyRelief", "#DepressionAwareness", "#OnlineTherapy"],
      details:
        "All-in-one mental health support platform thoughtfully designed to empower individuals facing emotional and psychological challenges such as depression, anxiety, or loneliness. At its core, MindMate is built on the belief that everyone deserves access to compassionate care, self-understanding, and a strong support system; right at their fingertips. To foster human connection, the platform offers a safe space to chat with trained helpers; compassionate volunteers or professionals ready to listen, provide advice, or simply be there when someone needs to talk. These one-on-one interactions are confidential and designed to reduce the sense of isolation that often comes with mental health struggles. In moments of crisis or when professional intervention is needed, MindMate allows users to seamlessly connect with nearby hospitals or mental health clinics. With just a few taps, users can access emergency contacts, schedule appointments, or find appropriate care. Eliminating the barriers that often prevent people from reaching out for help. Whether someone is taking their first step toward healing or seeking ongoing support. MindMate is here to walk that path with them, making mental health support more accessible, empathetic, and personal than ever before.",
      image: "/mindmate.jpeg",
    },
    {
      title: "Show PRO Application",
      description:
        "Smart and accessible solution created to help local shops improve their inventory management and point-of-sale (POS) processes. Focusing on supporting small businesses by efficient system",
      tags: ["#SmartPOS", "#RetailTech", "#DigitalTransformation", "#LocalBusinessSupport", "#TechForSMEs"],
      details:
        "Smart and accessible solution created to help local shops improve their inventory management and point-of-sale (POS) processes. Focusing on supporting small businesses by efficient system that reduces manual tasks and improves overall operational performance. At the core of Show Pro is a powerful combination of a Smart Stock Management System and an easy-to-use POS System. This integrated platform helps shop owners keep track of their inventory in real time, reducing errors and preventing stockouts or overstocking. By automating these essential tasks, business owners can focus more on serving customers and growing their businesses. The POS System in Show Pro is designed with simplicity and speed in mind. With a clean and intuitive interface, it allows for smooth and fast transactions that reduce customer wait times. The system supports a variety of payment methods including cash, credit cards, and digital payments like QR codes and mobile wallets. This ensures that local shops can meet the expectations of modern consumers who prefer convenient and contactless payment options. Show Pro is also built with inclusivity in mind. It is cost-effective and can be implemented using basic hardware, making it suitable for a wide range of local businesses regardless of size or technical experience. Whether it is a small convenience store, a street-side food stall, or a family-run café, Show Pro delivers real value by simplifying operations and improving the customer experience.",
      image: "/showpro.jpeg",
    },
    {
      title: "Prompt 7-Eleven System",
      description:
        "A revolutionary solution that brings the power of computer vision and sensor technology to convenience stores, transforming the retail experience by using computer vision algorithms.",
      tags: ["#RetailTech", "#ComputerVision", "#CheckoutFree", "#SensorTechnology", "#FutureOfShopping"],
      details:
        "A revolutionary solution that brings the power of computer vision and sensor technology to convenience stores, transforming the retail experience. By using computer vision algorithms, our system tracks customer movements and item selections in real time, creating a dynamic and seamless shopping experience. Customers no longer need to wait in long lines or go through traditional checkout processes. As they pick up products, the system automatically registers the items and deducts the corresponding amount from their accounts. This automation significantly reduces friction in the shopping process, allowing customers to simply walk in, grab what they need, and leave without any hassle. Our solution not only enhances the customer experience but also improves operational efficiency for stores. The advanced tracking system provides valuable insights into customer behavior and product demand, enabling businesses to optimize inventory management and improve stock replenishment. Additionally, the data collected can be used to tailor promotions and marketing strategies based on real-time consumer preferences. Prompt 7-Eleven is designed with the future of retail in mind. It combines cutting-edge technology with a focus on convenience, making shopping faster, more enjoyable, and more efficient for customers.",
      image: "/promptseven.jpeg",
    },
    {
      title: "National Healthcare Information",
      description:
        "A centralized database that compiles patient information from healthcare facilities across the country. This innovative solution is designed to provide real-time updates.",
      tags: ["#HealthcareRevolution", "#MedicalRecords", "#Interoperability", "#HealthTech", "#DataIntegration"],
      details:
        "A centralized database that compiles patient information from healthcare facilities across the country. This innovative solution is designed to provide real-time updates, ensuring that healthcare providers have immediate access to the latest information about a patient's health status, recent treatments, and ongoing care plans. The centralized repository will serve as a reliable and secure source of real-time patient data, accessible to authorized healthcare professionals nationwide. By integrating information from hospitals, clinics, and other healthcare providers, the database facilitates seamless communication between different healthcare systems, reducing the risk of errors and improving the overall quality of care. Healthcare professionals will have a holistic view of a patient's medical history, enabling them to make informed decisions and provide more accurate and efficient treatment. The project also aims to enhance patient safety by minimizing duplication of tests, improving coordination among healthcare providers, and ensuring timely interventions. By consolidating patient information into a single, unified system, the National Healthcare Information is poised to revolutionize healthcare delivery, improve patient outcomes, and enhance the overall efficiency of the healthcare system nationwide.",
      image: "/rama.jpeg",
    },
    {
      title: "Artificial Intelligence for GO",
      description:
        "Aims to enhance the traditional gameplay of the ancient board game GO by integrating Computer Vision and AI Algorithms to track the placement of black and white stones in real time.",
      tags: ["#ComputerVision", "#GoBoardGame", "#AIinGaming", "#MachineLearning", "#ReinforcementLearning"],
      details:
        "Aims to enhance the traditional gameplay of the ancient board game GO by integrating Computer Vision and AI Algorithms to track the placement of black and white stones in real time. The project focuses on automating the identification of the game board's current state. At the core of this project is the implementation of machine learning algorithms that continuously improve by learning from each game played. Using reinforcement learning, the AI refines its decision-making over time, adapting to various playing styles and evolving to become a stronger opponent. The system predicts optimal moves, providing players with a dynamic and competitive experience. The Computer Vision technology enables accurate detection and analysis of the game board, ensuring that the AI operates with precise game data. As the AI learns from both human and self-play interactions, it becomes more capable of executing advanced strategies. By combining modern AI techniques with the rich history of GO, this project creates an intelligent, ever-evolving opponent that offers players a challenging and immersive experience, making the game accessible and engaging for all skill levels.",
      image: "/aigo.png",
    },
    {
      title: "Road to 20K Page",
      description:
        "Increase social awareness about cybersecurity. Using the funds received to developed a variety of online resources, including articles & infographics to simplify complex cybersecurity concepts.",
      tags: ["#CybersecurityAwareness", "#OnlineSafety", "#DigitalSecurity", "#DataProtection", "#StaySafeOnline"],
      details:
        "Increase social awareness about cybersecurity. Using the funds received to developed a variety of online resources, including articles & infographics to simplify complex cybersecurity concepts. These resources are designed to be easily understandable and accessible to a diverse audience, from beginners to more tech-savvy individuals. Understanding the importance of engaging younger generations, we focused on interactive methods to connect with our target audience, leveraging popular social media platforms like Instagram and TikTok. By utilizing these platforms, we aim to create content that resonates with the youth and sparks meaningful discussions around cybersecurity. Through this project, we hope to foster a more informed and vigilant public, encouraging people to take proactive steps in protecting themselves from cyber threats. The combination of engaging content and accessible platforms ensures that cybersecurity awareness reaches a broad and engaged audience.",
      image: "/roadto20k.jpeg",
    },
  ]

  // Get current page of projects (6 per page)
  const projects = allProjects.slice(currentPage * 6, currentPage * 6 + 6)
  const totalPages = Math.ceil(allProjects.length / 6)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

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

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Handle project click
  const handleProjectClick = (index: number) => {
    const projectIndex = currentPage * 6 + index
    setSelectedProject(projectIndex)
  }

  // Modal component to be rendered in portal
  const Modal = () => {
    if (selectedProject === null) return null

    return createPortal(
      <motion.div
        className="modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => setSelectedProject(null)}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            className="modal-content w-full max-w-3xl max-h-[80vh] overflow-auto bg-gray-900 border border-gray-700 shadow-xl rounded-xl p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                {allProjects[selectedProject].title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800/50"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(null)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative h-70 mb-6 rounded-lg overflow-hidden">
              <img
                src={allProjects[selectedProject].image || "/placeholder.svg"}
                alt={allProjects[selectedProject].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>

            <div className="space-y-4" style={{ textAlign: "justify" }}>
              <p className="text-gray-200 leading-relaxed">{allProjects[selectedProject].details}</p>

              <div className="pt-4">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Related Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allProjects[selectedProject].tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      className="bg-gray-800/80 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>,
      document.body,
    )
  }

  return (
    <section id="projects" ref={ref} className="relative min-h-screen py-20 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-black to-purple-950/10 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
          >
            Projects
          </motion.h2>

          <motion.div variants={itemVariants} className="flex items-center gap-2 mt-2">
            <span className="text-gray-400 text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevPage}
                className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextPage}
                className="h-8 w-8 rounded-full bg-gray-800/50 text-gray-300 hover:bg-purple-900/50 hover:text-purple-300 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}`}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  className="h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
                  onClick={() => handleProjectClick(index)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <div className="text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to view details
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Render modal in portal to avoid stacking context issues */}
        {isMounted && selectedProject !== null && createPortal(<Modal />, document.body)}
      </motion.div>
    </section>
  )
}

