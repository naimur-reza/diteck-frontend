"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface GridCellProps {
  x: number;
  y: number;
  size: number;
  isActive: boolean;
  totalWidth: number;
}

const GridCell = ({ x, y, size, isActive, totalWidth }: GridCellProps) => {
  // Calculate opacity based on x position (for side fade effect)
  const calculateOpacity = useCallback(
    (x: number) => {
      const cellPosition = x * size;
      const center = totalWidth / 2;
      const distanceFromCenter = Math.abs(cellPosition - center);
      const maxDistance = totalWidth / 2;

      // Create a smoother bell curve effect where center is most visible
      const normalizedDistance = distanceFromCenter / maxDistance;
      const opacity = Math.max(0.1, 1 - Math.pow(normalizedDistance, 2));
      return opacity;
    },
    [size, totalWidth]
  );

  const baseOpacity = calculateOpacity(x);

  return (
    <motion.div
      className={`absolute border-[#171f2c]`}
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
        duration: isActive ? 0.15 : 0.3,
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
  );
};

export default function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const cellSize = 70;
  const scrollSpeed = 0.3; // Reduced for smoother movement

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smoother animation using direct DOM manipulation
  useEffect(() => {
    if (!gridRef.current) return;

    let animationFrameId: number;
    let yOffset = 0;

    const animate = () => {
      if (!gridRef.current) return;

      // Increment offset and reset when it reaches cellSize
      yOffset = (yOffset + scrollSpeed) % cellSize;

      // Apply transform directly to the DOM element
      gridRef.current.style.transform = `translateY(${yOffset}px)`;

      // Update state occasionally for React to know the position (for hover effects)
      if (Math.floor(yOffset) % 5 === 0) {
        setScrollY(yOffset);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cellSize, scrollSpeed]);

  // Calculate grid cells with optimized hover detection
  const renderGridCells = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return null;

    const cells = [];
    const cols = Math.ceil(dimensions.width / cellSize) + 1;
    const rows = Math.ceil(dimensions.height / cellSize) + 1;

    // Calculate which cell the mouse is over
    const hoverCellX = Math.floor(mousePosition.x / cellSize);
    const hoverCellY = Math.floor((mousePosition.y - scrollY) / cellSize);

    for (let y = -1; y < rows; y++) {
      for (let x = -1; x < cols; x++) {
        // Check if this cell is the one under the mouse
        const isActive = x === hoverCellX && y === hoverCellY;

        cells.push(
          <GridCell
            key={`${x}-${y}`}
            x={x}
            y={y}
            size={cellSize}
            isActive={isActive}
            totalWidth={dimensions.width}
          />
        );
      }
    }

    return cells;
  }, [dimensions, mousePosition, scrollY, cellSize]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none bg-black/90"
    >
      {/* Gradient overlays for side fade effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80 z-10" />

      <div
        ref={gridRef}
        className="absolute inset-0 will-change-transform"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateY(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {renderGridCells()}
      </div>
    </div>
  );
}
