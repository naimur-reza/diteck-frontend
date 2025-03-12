"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface GridCellProps {
  x: number
  y: number
  size: number
  isActive: boolean
  totalWidth: number
}

const GridCell = ({ x, y, size, isActive, totalWidth }: GridCellProps) => {
  // Calculate opacity based on x position (for side fade effect)
  const calculateOpacity = useCallback(
    (x: number) => {
      const cellPosition = x * size
      const center = totalWidth / 2
      const distanceFromCenter = Math.abs(cellPosition - center)
      const maxDistance = totalWidth / 2

      // Create a smoother bell curve effect where center is most visible
      const normalizedDistance = distanceFromCenter / maxDistance
      const opacity = Math.max(0.1, 1 - Math.pow(normalizedDistance, 2))
      return opacity
    },
    [size, totalWidth],
  )

  const baseOpacity = calculateOpacity(x)

  return (
    <motion.div
      className={`absolute ${isActive ? "bg-blue-500/20 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-[#1e293b]"}`}
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: "1px",
        backdropFilter: isActive ? "blur(2px)" : "none",
      }}
      initial={{ opacity: baseOpacity }}
      animate={{
        opacity: isActive ? 0.8 : baseOpacity,
        scale: isActive ? 1.02 : 1,
      }}
      transition={{
        duration: isActive ? 0.15 : 0.3, // Faster transition when activating, slower when deactivating
        opacity: {
          duration: isActive ? 0.15 : 0.3,
          ease: isActive ? "easeOut" : "easeInOut",
        },
        scale: {
          duration: isActive ? 0.15 : 0.3,
          ease: "easeOut",
        },
      }}
    />
  )
}

export default function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cellSize = 70
  const scrollSpeed = 0.5 // pixels per frame at 60fps

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Track mouse position - no debounce for immediate response
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Immediate update for responsive hover
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animate scroll position using requestAnimationFrame for smoother animation
  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      setScrollPosition((prev) => {
        // Calculate smooth movement based on time delta
        const newY = (prev.y + scrollSpeed * (deltaTime / 16.67)) % cellSize
        return {
          x: 0,
          y: newY,
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cellSize])

  // Calculate grid cells with optimized hover detection
  const renderGridCells = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return null

    const cells = []
    const cols = Math.ceil(dimensions.width / cellSize) + 1
    const rows = Math.ceil(dimensions.height / cellSize) + 1

    // Calculate which cell the mouse is over - more direct calculation
    const hoverCellX = Math.floor(mousePosition.x / cellSize)
    const hoverCellY = Math.floor((mousePosition.y - scrollPosition.y) / cellSize)

    for (let y = -1; y < rows; y++) {
      for (let x = -1; x < cols; x++) {
        // Check if this cell is the one under the mouse
        const isActive = x === hoverCellX && y === hoverCellY

        cells.push(
          <GridCell key={`${x}-${y}`} x={x} y={y} size={cellSize} isActive={isActive} totalWidth={dimensions.width} />,
        )
      }
    }

    return cells
  }, [dimensions, mousePosition, scrollPosition, cellSize])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none bg-black/90">
      {/* Gradient overlays for side fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80 z-10" />

      <motion.div
        className="absolute inset-0"
        style={{
          x: 0,
          y: scrollPosition.y,
        }}
        transition={{ type: "tween", ease: "linear" }}
      >
        {renderGridCells()}
      </motion.div>
    </div>
  )
}

