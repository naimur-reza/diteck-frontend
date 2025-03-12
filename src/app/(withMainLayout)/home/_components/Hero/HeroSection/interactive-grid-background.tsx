"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface GridCellProps {
  x: number
  y: number
  size: number
  isActive: boolean
}

const GridCell = ({ x, y, size, isActive }: GridCellProps) => {
  // Calculate opacity based on x position (for side fade effect)
  const calculateOpacity = (x: number, totalWidth: number) => {
    const cellPosition = x * size
    const center = totalWidth / 2
    const distanceFromCenter = Math.abs(cellPosition - center)
    const maxDistance = totalWidth / 2

    // Create a bell curve effect where center is most visible
    const opacity = Math.max(0.1, 1 - distanceFromCenter / maxDistance)
    return opacity
  }

  return (
    <motion.div
      className={`absolute transition-all duration-300
        ${isActive ? "bg-blue-500/20 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-[#1e293b]"}`}
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: "1px",
        backdropFilter: isActive ? "blur(2px)" : "none",
        opacity: calculateOpacity(x, window.innerWidth),
      }}
      initial={{ opacity: calculateOpacity(x, window.innerWidth) }}
      animate={{
        opacity: isActive ? 0.8 : calculateOpacity(x, window.innerWidth),
      }}
      transition={{ duration: 0.3 }}
    />
  )
}

export default function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cellSize = 70

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

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animate scroll position (vertical only)
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => ({
        x: 0, // Keep x position static
        y: (prev.y + 1) % cellSize, // Only move vertically
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [cellSize])

  // Calculate grid cells
  const renderGridCells = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return null

    const cells = []
    const cols = Math.ceil(dimensions.width / cellSize) + 1
    const rows = Math.ceil(dimensions.height / cellSize) + 1

    // Calculate which cell the mouse is over
    const adjustedX = mousePosition.x - scrollPosition.x
    const adjustedY = mousePosition.y - scrollPosition.y
    const hoverCellX = Math.floor(adjustedX / cellSize)
    const hoverCellY = Math.floor(adjustedY / cellSize)

    for (let y = -1; y < rows; y++) {
      for (let x = -1; x < cols; x++) {
        // Check if this cell is the one under the mouse
        const isActive = x === hoverCellX && y === hoverCellY

        cells.push(<GridCell key={`${x}-${y}`} x={x} y={y} size={cellSize} isActive={isActive} />)
      }
    }

    return cells
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none bg-black/90">
      {/* Gradient overlays for side fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80 z-10" />

      <motion.div
        className="absolute inset-0"
        style={{
          x: scrollPosition.x,
          y: scrollPosition.y,
        }}
      >
        {renderGridCells()}
      </motion.div>
    </div>
  )
}

