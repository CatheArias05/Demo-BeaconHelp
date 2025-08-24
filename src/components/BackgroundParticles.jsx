import React, { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/BackgroundParticles.css'

const BackgroundParticles = () => {
  const { isDarkMode } = useTheme()
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseParticlesRef = useRef([])
  const animationRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 20 + 15,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          type: Math.random() > 0.3 ? 'helix' : 'base',
          age: 0,
        })
      }

      particlesRef.current = particles
    }

    const createMouseParticle = (x, y) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 15 + 10,
        opacity: 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        type: Math.random() > 0.5 ? 'helix' : 'base',
        age: 0,
      }
    }

    const drawParticle = (particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)

      if (particle.type === 'helix') {
        // Dibujar icono de escudo
        const scale = particle.size / 24
        ctx.strokeStyle = isDarkMode ? '#94a3b8' : '#475569'
        ctx.lineWidth = 2
        ctx.fillStyle = 'none'
        
        ctx.scale(scale, scale)
        
        // Path del escudo: M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z
        ctx.beginPath()
        ctx.moveTo(20, 13)
        ctx.bezierCurveTo(20, 18, 16.5, 20.5, 12.34, 21.95)
        ctx.bezierCurveTo(12.12, 21.98, 11.88, 21.98, 11.67, 21.94)
        ctx.bezierCurveTo(7.5, 20.5, 4, 18, 4, 13)
        ctx.lineTo(4, 6)
        ctx.bezierCurveTo(4, 5.45, 4.45, 5, 5, 5)
        ctx.bezierCurveTo(7, 5, 9.5, 3.8, 11.24, 2.28)
        ctx.bezierCurveTo(11.75, 1.91, 12.25, 1.91, 12.76, 2.28)
        ctx.bezierCurveTo(14.51, 3.81, 17, 5, 19, 5)
        ctx.bezierCurveTo(19.55, 5, 20, 5.45, 20, 6)
        ctx.closePath()
        ctx.stroke()
      } else {
        ctx.fillStyle = isDarkMode ? '#64748b' : '#94a3b8'
        ctx.strokeStyle = isDarkMode ? '#94a3b8' : '#475569'
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
            particle.opacity = Math.min(0.08, particle.opacity + force * 0.015)
          } else {
            particle.opacity = Math.max(0.05, particle.opacity - 0.003)
          }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        particle.vx += (Math.random() - 0.5) * 0.008
         particle.vy += (Math.random() - 0.5) * 0.008

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

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles()
      particlesRef.current.forEach(drawParticle)
      mouseParticlesRef.current.forEach(drawParticle)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
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

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="dna-particles-canvas" 
      style={{ background: 'transparent' }} 
    />
  )
}

export default BackgroundParticles