"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  // Set initial position to middle top of page
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  // Start with cursor visible
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Set initial position to middle top after mounting
    setPosition({ x: window.innerWidth / 2, y: 200 })
    setMounted(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
    }

    // Only handle mouse leave, keep visible by default
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Add CSS to ensure all clickable elements don't show default cursor
    const style = document.createElement("style")
    style.textContent = `
      a, button, [role="button"], .cursor-pointer, [onclick], 
      input[type="submit"], input[type="button"], input[type="reset"],
      .modal-backdrop, .modal-content, .modal-content * {
        cursor: none !important;
      }
      
      /* Ensure custom cursor is always on top */
      .custom-cursor {
        z-index: 999999 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.head.removeChild(style)
    }
  }, [])

  // Don't render anything during SSR or before hydration
  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 custom-cursor"
        // No initial opacity: 0 to make it visible immediately
        animate={{
          x: position.x - (isPointer ? 15 : 10),
          y: position.y - (isPointer ? 15 : 10),
          width: isPointer ? 30 : 20,
          height: isPointer ? 30 : 20,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
        }}
      >
        <div
          className={`w-full h-full rounded-full ${isPointer ? "bg-cyan-500/20 border-2" : "border"} border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]`}
        />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 shadow-[0_0_5px_rgba(34,211,238,0.9)] custom-cursor"
        // No initial opacity: 0 to make it visible immediately
        animate={{
          x: position.x - 7,
          y: position.y - 7,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "linear",
        }}
      />

      {/* Click indicator for pointer elements */}
      {isPointer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 pointer-events-none z-50 text-cyan-400 font-bold text-xs custom-cursor"
          style={{
            x: position.x + 15,
            y: position.y - 10,
          }}
        />
      )}
    </>
  )
}

