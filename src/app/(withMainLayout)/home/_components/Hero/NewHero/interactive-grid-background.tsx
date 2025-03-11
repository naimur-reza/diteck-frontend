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
  return (
    <motion.div
      className={`absolute transition-all duration-300
        ${
          isActive ? "bg-blue-500/20 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-[#1e293b]"
        }`}
      style={{
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: "1px",
        backdropFilter: isActive ? "blur(2px)" : "none",
      }}
      initial={{ opacity: 0.4 }}
      animate={{
        opacity: isActive ? 0.8 : 0.4,
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
  const cellSize = 80

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

  // Animate scroll position
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => ({
        x: (prev.x + 0.5) % cellSize,
        y: (prev.y + 0.5) % cellSize,
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

