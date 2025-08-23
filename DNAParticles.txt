"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotation: number
  rotationSpeed: number
  type: "helix" | "base"
  age: number
}

export function DNAParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseParticlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 20 + 15,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: Math.random() > 0.3 ? "helix" : "base",
          age: 0,
        })
      }

      particlesRef.current = particles
    }

    const createMouseParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 15 + 10,
        opacity: 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: Math.random() > 0.5 ? "helix" : ("base" as "helix" | "base"),
        age: 0,
      }
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)

      if (particle.type === "helix") {
        const helixHeight = particle.size
        const helixWidth = particle.size * 0.6
        const turns = 2

        ctx.strokeStyle = "#475569"
        ctx.lineWidth = 2

        ctx.beginPath()
        for (let i = 0; i <= 50; i++) {
          const t = i / 50
          const y = (t - 0.5) * helixHeight
          const x = Math.sin(t * Math.PI * turns) * helixWidth * 0.3
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.beginPath()
        for (let i = 0; i <= 50; i++) {
          const t = i / 50
          const y = (t - 0.5) * helixHeight
          const x = Math.sin(t * Math.PI * turns + Math.PI) * helixWidth * 0.3
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.strokeStyle = "#64748b"
        ctx.lineWidth = 1
        for (let i = 0; i <= 8; i++) {
          const t = i / 8
          const y = (t - 0.5) * helixHeight
          const x1 = Math.sin(t * Math.PI * turns) * helixWidth * 0.3
          const x2 = Math.sin(t * Math.PI * turns + Math.PI) * helixWidth * 0.3

          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(x2, y)
          ctx.stroke()

          ctx.fillStyle = "#94a3b8"
          ctx.beginPath()
          ctx.arc(x1, y, 1, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(x2, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        ctx.fillStyle = "#94a3b8"
        ctx.strokeStyle = "#475569"
        ctx.lineWidth = 1

        const radius = particle.size * 0.15
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      ctx.restore()
    }

    const updateParticles = () => {
      const particles = particlesRef.current
      const mouseParticles = mouseParticlesRef.current
      const mouse = mouseRef.current

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.002
          particle.vy += (dy / distance) * force * 0.002
          particle.opacity = Math.min(0.2, particle.opacity + force * 0.015)
        } else {
          particle.opacity = Math.max(0.05, particle.opacity - 0.003)
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        particle.vx += (Math.random() - 0.5) * 0.02
        particle.vy += (Math.random() - 0.5) * 0.02

        particle.vx *= 0.998
        particle.vy *= 0.998

        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50
      })

      mouseParticles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed
        particle.age++
        particle.opacity = Math.max(0, 0.25 - particle.age * 0.008)

        if (particle.age > 100 || particle.opacity <= 0) {
          mouseParticles.splice(index, 1)
        }
      })
    }

    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles()
      particlesRef.current.forEach(drawParticle)
      mouseParticlesRef.current.forEach(drawParticle)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newMouse = { x: e.clientX, y: e.clientY }

      if (Math.random() < 0.03) {
        const particle = createMouseParticle(newMouse.x, newMouse.y)
        mouseParticlesRef.current.push(particle)
      }

      if (mouseParticlesRef.current.length > 6) {
        mouseParticlesRef.current.shift()
      }

      mouseRef.current = newMouse
    }

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}