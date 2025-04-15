'use client'

import {useEffect, useRef} from 'react'
import * as THREE from 'three'

import {fragmentShader, vertexShader} from '@/lib/shaders/homeShaders'

interface Props {
  text: string
  size?: number
  width?: number
  height?: number
}

const ShaderText: React.FC<Props> = ({text, size = null, width, height}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textContainer = containerRef.current
    if (!textContainer) return

    let easeFactor = 0.02
    let scene: THREE.Scene, camera: THREE.OrthographicCamera, renderer: THREE.WebGLRenderer, planeMesh: THREE.Mesh

    let mousePosition = {x: 0.5, y: 0.5}
    let targetMousePosition = {x: 0.5, y: 0.5}
    let prevPosition = {x: 0.5, y: 0.5}

    function createTextTexture(text: string, font: string, size: number | null, color: string, fontWeight = '100') {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      const canvasWidth = window.innerWidth * 2
      const canvasHeight = window.innerHeight * 2

      canvas.width = canvasWidth
      canvas.height = canvasHeight

      ctx.fillStyle = color || '#171717'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const fontSize = size || Math.floor(canvasWidth * 2)

      ctx.fillStyle = '#ffffff'
      ctx.font = `${fontWeight} ${fontSize}px "${font || 'Montserrat'}"`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      const textMetrics = ctx.measureText(text)
      const textWidth = textMetrics.width

      const scaleFactor = Math.min(1, (canvasWidth * 1) / textWidth)
      const aspectCorrection = canvasWidth / canvasHeight

      ctx.setTransform(scaleFactor, 0, 0, scaleFactor / aspectCorrection, canvasWidth / 2, canvasHeight / 2)

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = fontSize * 0.005
      for (let i = 0; i < 3; i++) ctx.strokeText(text, 0, 0)
      ctx.fillText(text, 0, 0)

      return new THREE.CanvasTexture(canvas)
    }

    function initializeScene(texture: THREE.Texture) {
      scene = new THREE.Scene()

      const aspectRatio = window.innerWidth / window.innerHeight
      camera = new THREE.OrthographicCamera(-1, 1, 1 / aspectRatio, -1 / aspectRatio, 0.1, 1000)
      camera.position.z = 1

      const shaderUniforms = {
        u_mouse: {type: 'v2', value: new THREE.Vector2()},
        u_prevMouse: {type: 'v2', value: new THREE.Vector2()},
        u_texture: {type: 't', value: texture},
      }

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader,
        })
      )
      scene.add(planeMesh)

      renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.setClearColor(0xffffff, 1)
      renderer.setSize(width || window.innerWidth, height || window.innerHeight - 64)
      renderer.setPixelRatio(window.devicePixelRatio)

      textContainer?.appendChild(renderer.domElement)
    }

    function animateScene() {
      requestAnimationFrame(animateScene)

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor
      ;(planeMesh.material as THREE.ShaderMaterial).uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y)
      ;(planeMesh.material as THREE.ShaderMaterial).uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y)

      renderer.render(scene, camera)
    }

    function handleMouseMove(event: MouseEvent) {
      easeFactor = 0.04
      const rect = textContainer?.getBoundingClientRect()
      if (!rect) return
      prevPosition = {...targetMousePosition}
      targetMousePosition.x = (event.clientX - rect.left) / rect.width
      targetMousePosition.y = (event.clientY - rect.top) / rect.height
    }

    function handleMouseEnter(event: MouseEvent) {
      easeFactor = 0.02
      const rect = textContainer?.getBoundingClientRect()
      if (!rect) return

      mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width
      mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height
    }

    function handleMouseLeave() {
      easeFactor = 0.02
      targetMousePosition = {...prevPosition}
    }

    const textTexture = createTextTexture(text, 'Montserrat', size, 'transparent', '500')

    initializeScene(textTexture)
    animateScene()

    textContainer.addEventListener('mousemove', handleMouseMove)
    textContainer.addEventListener('mouseenter', handleMouseEnter)
    textContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      textContainer.removeEventListener('mousemove', handleMouseMove)
      textContainer.removeEventListener('mouseenter', handleMouseEnter)
      textContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [text, size, width, height])

  return <div ref={containerRef} id='textContainer' className='[&>canvas]:mx-auto' />
}

export default ShaderText
