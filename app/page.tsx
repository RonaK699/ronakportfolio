"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Star,
  Send,
  Code,
  Palette,
  Smartphone,
  Globe,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react"

// Enhanced Particle Animation Component with Dynamic Movement
const EnhancedParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      opacity: number
      vx: number
      vy: number
      color: string
    }>
  >([])

  useEffect(() => {
    const generateParticles = () => {
      const colors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B"]
      const newParticles = []
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, particle.vx * 100, 0],
            y: [0, particle.vy * 100, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Floating Geometric Shapes
const FloatingShapes = () => {
  const shapes = [
    { id: 1, type: "circle", size: 60, x: 10, y: 20 },
    { id: 2, type: "square", size: 40, x: 80, y: 60 },
    { id: 3, type: "triangle", size: 50, x: 20, y: 80 },
    { id: 4, type: "circle", size: 30, x: 90, y: 10 },
    { id: 5, type: "square", size: 35, x: 60, y: 30 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm" />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm transform rotate-45" />
          )}
          {shape.type === "triangle" && (
            <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[43px] border-l-transparent border-r-transparent border-b-purple-500/20" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Enhanced Typing Animation with Cursor
const EnhancedTypingAnimation = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.8, repeat: isComplete ? 0 : Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-6 bg-gradient-to-b from-purple-400 to-blue-400 ml-1"
      />
    </span>
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className = "", ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Button ref={ref} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

// Enhanced 3D Tilt Card with Glow Effect
const Enhanced3DTiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (e.clientY - centerY) / 8
    const rotateYValue = (centerX - e.clientX) / 8

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </motion.div>
  )
}

// Scroll Reveal Component
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Text Reveal Animation
const TextReveal = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ")

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Optimized Custom Animated Cursor Component
const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  // Use refs for smooth animation without re-renders
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const trailPositionRef = useRef({ x: 0, y: 0 })
  const ringPositionRef = useRef({ x: 0, y: 0 })

  // Smooth interpolation function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  // Optimized animation loop using requestAnimationFrame
  const animateCursor = useCallback(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    const ring = ringRef.current

    if (!cursor || !trail || !ring) return

    // Smooth interpolation for main cursor (fast response)
    targetPositionRef.current.x = lerp(targetPositionRef.current.x, mousePositionRef.current.x, 0.15)
    targetPositionRef.current.y = lerp(targetPositionRef.current.y, mousePositionRef.current.y, 0.15)

    // Smooth interpolation for trail (slower response)
    trailPositionRef.current.x = lerp(trailPositionRef.current.x, mousePositionRef.current.x, 0.08)
    trailPositionRef.current.y = lerp(trailPositionRef.current.y, mousePositionRef.current.y, 0.08)

    // Smooth interpolation for ring (medium response)
    ringPositionRef.current.x = lerp(ringPositionRef.current.x, mousePositionRef.current.x, 0.12)
    ringPositionRef.current.y = lerp(ringPositionRef.current.y, mousePositionRef.current.y, 0.12)

    // Apply transforms using transform3d for hardware acceleration
    cursor.style.transform = `translate3d(${targetPositionRef.current.x - 16}px, ${targetPositionRef.current.y - 16}px, 0)`
    trail.style.transform = `translate3d(${trailPositionRef.current.x - 4}px, ${trailPositionRef.current.y - 4}px, 0)`
    ring.style.transform = `translate3d(${ringPositionRef.current.x - 24}px, ${ringPositionRef.current.y - 24}px, 0)`

    animationFrameRef.current = requestAnimationFrame(animateCursor)
  }, [])

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      // Update state only when necessary to prevent unnecessary re-renders
      if (!isVisible) {
        setIsVisible(true)
      }
    },
    [isVisible],
  )

  // Detect interactive elements more efficiently
  const updateCursorVariant = useCallback((target: HTMLElement) => {
    const computedStyle = window.getComputedStyle(target)
    const isClickable =
      computedStyle.cursor === "pointer" ||
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("button") ||
      target.closest("a") ||
      target.getAttribute("role") === "button"

    setIsPointer(isClickable)

    if (target.tagName === "BUTTON" || target.closest("button")) {
      setCursorVariant("button")
    } else if (target.tagName === "A" || target.closest("a")) {
      setCursorVariant("link")
    } else if (target.closest(".project-card")) {
      setCursorVariant("project")
    } else if (target.closest("input") || target.closest("textarea")) {
      setCursorVariant("input")
    } else if (target.closest(".social-icon")) {
      setCursorVariant("social")
    } else if (isClickable) {
      setCursorVariant("button")
    } else {
      setCursorVariant("default")
    }
  }, [])

  // Optimized mouse over handler with debouncing
  const handleMouseOver = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement
      if (target) {
        updateCursorVariant(target)
      }
    },
    [updateCursorVariant],
  )

  // Handle mouse leave/enter for visibility
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  // Setup event listeners and animation
  useEffect(() => {
    // Check if device supports hover (desktop)
    const supportsHover = window.matchMedia("(hover: hover)").matches
    if (!supportsHover) return

    // Add event listeners with passive option for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateCursor)

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter, animateCursor])

  // Don't render on touch devices or if not visible
  const supportsHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
  if (!supportsHover || !isVisible) return null

  // Cursor variant styles with optimized transitions
  const getCursorStyles = (variant: string) => {
    const baseStyles = {
      position: "fixed" as const,
      top: 0,
      left: 0,
      pointerEvents: "none" as const,
      zIndex: 9999,
      borderRadius: "50%",
      transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
      willChange: "transform",
    }

    switch (variant) {
      case "button":
        return {
          ...baseStyles,
          width: "48px",
          height: "48px",
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          mixBlendMode: "difference" as const,
        }
      case "link":
        return {
          ...baseStyles,
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          mixBlendMode: "difference" as const,
        }
      case "project":
        return {
          ...baseStyles,
          width: "64px",
          height: "64px",
          backgroundColor: "rgba(245, 158, 11, 0.6)",
          mixBlendMode: "difference" as const,
        }
      case "input":
        return {
          ...baseStyles,
          width: "4px",
          height: "24px",
          backgroundColor: "rgba(139, 92, 246, 1)",
          mixBlendMode: "normal" as const,
          borderRadius: "2px",
        }
      case "social":
        return {
          ...baseStyles,
          width: "56px",
          height: "56px",
          backgroundColor: "rgba(236, 72, 153, 0.8)",
          mixBlendMode: "difference" as const,
        }
      default:
        return {
          ...baseStyles,
          width: "32px",
          height: "32px",
          backgroundColor: "rgba(139, 92, 246, 0.8)",
          mixBlendMode: "difference" as const,
        }
    }
  }

  const getTrailStyles = () => ({
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "8px",
    height: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 9998,
    transition: "opacity 0.2s ease",
    willChange: "transform",
  })

  const getRingStyles = () => ({
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: cursorVariant === "button" ? "72px" : cursorVariant === "project" ? "96px" : "48px",
    height: cursorVariant === "button" ? "72px" : cursorVariant === "project" ? "96px" : "48px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 9997,
    transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
    willChange: "transform",
  })

  return (
    <>
      {/* Main Cursor */}
      <div ref={cursorRef} style={getCursorStyles(cursorVariant)} />

      {/* Cursor Trail */}
      <div ref={trailRef} style={getTrailStyles()} />

      {/* Cursor Ring */}
      <div ref={ringRef} style={getRingStyles()} />

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        /* Restore cursor for specific elements that need it */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        textarea {
          cursor: text !important;
        }
        
        /* Ensure smooth rendering */
        .cursor-element {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200])
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  const projects = [
    {
      id: 1,
      title: "MG Hair India - E-Commerce Platform",
      description:
        "A premium hair extensions e-commerce platform featuring 100% Remy Indian human hair products. Built with modern design, seamless shopping experience, and integrated payment processing.",
      image: "/images/mg-hair-project.png",
      tech: ["React", "Next.js", "Shopify", "Stripe"],
      link: "https://mghairindia.com/",
      github: "https://github.com",
      hasLiveDemo: true,
      hasCode: true,
    },
    {
      id: 2,
      title: "Nirvana Organic - Wellness Platform",
      description:
        "An organic products marketplace promoting wholesome goodness with farm-fresh staples and handcrafted wellness products. Features clean design and sustainable shopping experience.",
      image: "/images/nirvana-organic-project.png",
      tech: ["Next.js", "Node.js", "MongoDB", "PayPal"],
      link: "https://www.nirvanaorganic.in/",
      github: "https://github.com",
      hasLiveDemo: true,
      hasCode: true,
    },
    {
      id: 3,
      title: "Intelligence Educare - Learning Platform",
      description:
        "An innovative educational platform currently in development where learning meets innovation. This upcoming project will feature modern course management, interactive learning modules, and seamless user experience for students and educators. Expected launch: Q2 2024.",
      image: "/images/intelligence-educare-project.png",
      tech: ["React", "Node.js", "Express", "PostgreSQL"],
      link: "#",
      github: "#",
      hasLiveDemo: false,
      hasCode: false,
      status: "In Development",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content:
        "Ronak delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise is unmatched.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLab",
      content:
        "Working with Ronak was a game-changer for our startup. He transformed our vision into a stunning, functional reality.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, DesignCo",
      content:
        "Ronak's creative approach and technical skills make him a rare find. Our project was delivered on time and beyond expectations.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "End-to-end web applications with modern technologies",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Optimization",
      description: "Performance optimization and SEO enhancement",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "services", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Loading Screen
  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            RONAK
          </motion.h1>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add the optimized animated cursor */}
      <AnimatedCursor />

      {/* Enhanced Particle Background */}
      <EnhancedParticleBackground />
      <FloatingShapes />

      {/* Gradient Overlays with Animation */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none"
        style={{ y: yRange }}
      />
      <div className="fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: pathLength }}
      />

      {/* Enhanced Sticky Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
              >
                RONAK
              </motion.span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "services", "testimonials", "contact"].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors relative ${
                    activeSection === section ? "text-purple-400" : "text-white/70 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {section === "about" ? "About Me" : section}
                  {activeSection === section && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                      layoutId="activeSection"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <TextReveal
                text="I build digital"
                className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent block"
              />
              <TextReveal
                text="products that make"
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block"
              />
              <TextReveal
                text="people stop and stare."
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block"
              />
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <EnhancedTypingAnimation text="Creative web developer crafting exceptional digital experiences with cutting-edge technology and stunning design." />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <MagneticButton
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
                onClick={() => scrollToSection("contact")}
              >
                Work With Me
                <motion.div className="ml-2 group-hover:translate-x-1 transition-transform" whileHover={{ x: 5 }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </MagneticButton>

              <motion.button
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Work</span>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.img
                  src="/images/ronak-portrait.jpg"
                  alt="Ronak Ranja - Creative Web Developer"
                  className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.h2
                className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                About Me
              </motion.h2>

              <div className="text-xl text-white/80 mb-8 leading-relaxed">
                <EnhancedTypingAnimation text="I'm a passionate full-stack developer with 5+ years of experience creating digital masterpieces. I specialize in React, Node.js, and modern web technologies, turning complex ideas into elegant, user-friendly solutions." />
              </div>

              <motion.div
                className="grid grid-cols-2 gap-6 mb-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { number: "50+", label: "Projects Completed", color: "purple" },
                  { number: "5+", label: "Years Experience", color: "blue" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 group hover:bg-white/10 transition-all duration-300"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.h3
                      className={`text-2xl font-bold text-${stat.color}-400 mb-2`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-white/70">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {["React", "Node.js", "TypeScript", "Python", "AWS", "MongoDB"].map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border-purple-500/30 px-4 py-2 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{
                  backgroundImage: [
                    "linear-gradient(to right, #ffffff, #c4b5fd)",
                    "linear-gradient(to right, #8b5cf6, #3b82f6)",
                    "linear-gradient(to right, #ffffff, #c4b5fd)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Featured Projects
              </motion.h2>
              <motion.p
                className="text-xl text-white/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
              </motion.p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -15 },
                  visible: { opacity: 1, y: 0, rotateX: 0 },
                }}
              >
                <Enhanced3DTiltCard className="h-full">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 h-full group cursor-pointer overflow-hidden project-card">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <motion.img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MagneticButton
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedProject(project)}
                            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                          >
                            View Details
                          </MagneticButton>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <motion.h3
                          className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {project.title}
                        </motion.h3>
                        <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                        <motion.div
                          className="flex flex-wrap gap-2 mb-4"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                          initial="hidden"
                          whileInView="visible"
                        >
                          {project.tech.map((tech) => (
                            <motion.div
                              key={tech}
                              variants={{
                                hidden: { opacity: 0, scale: 0 },
                                visible: { opacity: 1, scale: 1 },
                              }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge
                                variant="outline"
                                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                        <div className="flex gap-3">
                          {project.hasLiveDemo && (
                            <MagneticButton
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/10 bg-transparent group"
                              onClick={() => window.open(project.link, "_blank")}
                            >
                              <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
                              Live Demo
                            </MagneticButton>
                          )}
                          {project.hasCode && (
                            <MagneticButton
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/10 bg-transparent group"
                              onClick={() => window.open(project.github, "_blank")}
                            >
                              <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                              Code
                            </MagneticButton>
                          )}
                          {project.status === "In Development" && (
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 text-orange-300 border-orange-500/30 px-3 py-1"
                            >
                              🚧 In Development
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Enhanced3DTiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              >
                Services
              </motion.h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to your business needs.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateY: -15 },
                  visible: { opacity: 1, y: 0, rotateY: 0 },
                }}
              >
                <Enhanced3DTiltCard>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 h-full group">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        className="mb-6 text-purple-400 group-hover:text-blue-400 transition-colors duration-300 flex justify-center"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, 0],
                          y: -5,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.icon}
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors">{service.description}</p>
                    </CardContent>
                  </Card>
                </Enhanced3DTiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                What Clients Say
              </motion.h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Don't just take my word for it - hear from satisfied clients.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Enhanced3DTiltCard>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-12 text-center">
                      <motion.div
                        className="flex justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.2, rotate: 180 }}
                          >
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.blockquote
                        className="text-2xl text-white/90 mb-8 italic leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        "{testimonials[currentTestimonial].content}"
                      </motion.blockquote>
                      <motion.div
                        className="flex items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <motion.img
                          src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                          alt={testimonials[currentTestimonial].name}
                          className="w-16 h-16 rounded-full border-2 border-purple-500/30"
                          whileHover={{ scale: 1.1, borderColor: "rgb(147 51 234 / 0.6)" }}
                        />
                        <div>
                          <motion.h4 className="text-xl font-bold text-white" whileHover={{ color: "#c4b5fd" }}>
                            {testimonials[currentTestimonial].name}
                          </motion.h4>
                          <p className="text-purple-400">{testimonials[currentTestimonial].role}</p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Enhanced3DTiltCard>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="flex justify-center mt-8 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-purple-400 scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                whileInView={{
                  textShadow: [
                    "0 0 0px rgba(139, 92, 246, 0)",
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 0px rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Let's Work Together
              </motion.h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Ready to bring your vision to life? Let's discuss your next project.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <Enhanced3DTiltCard>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/8 transition-all duration-300">
                  <CardContent className="p-8">
                    <motion.form
                      className="space-y-6"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <div className="space-y-2">
                          <label className="text-white/80">Name</label>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 focus:bg-white/10 transition-all duration-300"
                              placeholder="Your name"
                            />
                          </motion.div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/80">Email</label>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              type="email"
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 focus:bg-white/10 transition-all duration-300"
                              placeholder="your@email.com"
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <label className="text-white/80">Subject</label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 focus:bg-white/10 transition-all duration-300"
                            placeholder="Project inquiry"
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <label className="text-white/80">Message</label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Textarea
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 focus:bg-white/10 min-h-32 transition-all duration-300"
                            placeholder="Tell me about your project..."
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <MagneticButton
                          type="submit"
                          size="lg"
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                          />
                          <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Message
                        </MagneticButton>
                      </motion.div>
                    </motion.form>
                  </CardContent>
                </Card>
              </Enhanced3DTiltCard>

              <motion.div
                className="flex justify-center gap-6 mt-12"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: <Github className="w-6 h-6" />, href: "#", color: "hover:text-gray-300" },
                  { icon: <Linkedin className="w-6 h-6" />, href: "#", color: "hover:text-blue-400" },
                  { icon: <Twitter className="w-6 h-6" />, href: "#", color: "hover:text-sky-400" },
                  { icon: <Mail className="w-6 h-6" />, href: "#", color: "hover:text-red-400" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-14 h-14 bg-white/5 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group social-icon ${social.color}`}
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.2,
                      y: -5,
                      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      {social.icon}
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced Footer */}
      <motion.footer
        className="py-12 border-t border-white/10 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.p className="text-white/50" whileHover={{ color: "rgba(255, 255, 255, 0.8)" }}>
            © 2024 Ronak. All rights reserved. Built with passion and cutting-edge technology.
          </motion.p>
        </div>
      </motion.footer>

      {/* Enhanced Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <motion.h3
                    className="text-3xl font-bold text-white"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedProject.title}
                  </motion.h3>
                  <MagneticButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </MagneticButton>
                </div>

                <motion.img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                />

                <motion.p
                  className="text-white/80 text-lg mb-6 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {selectedProject.tech.map((tech: string) => (
                    <motion.div
                      key={tech}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {selectedProject.hasLiveDemo && (
                    <MagneticButton
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
                      onClick={() => window.open(selectedProject.link, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
                      Live Demo
                    </MagneticButton>
                  )}
                  {selectedProject.hasCode && (
                    <MagneticButton
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent group"
                      onClick={() => window.open(selectedProject.github, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      View Code
                    </MagneticButton>
                  )}
                  {selectedProject.status === "In Development" && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 text-orange-300 border-orange-500/30 px-4 py-2"
                      >
                        🚧 Currently in Development
                      </Badge>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
