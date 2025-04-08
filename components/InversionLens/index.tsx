'use client'

import {useEffect, useRef} from 'react'
import * as THREE from 'three'

import {fragmentShader, vertexShader} from './shaders'

interface Props {
  src: string
}

const InversionLens: React.FC<Props> = ({src}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null)
  const isSetupCompleteRef = useRef<boolean>(false)

  const config = {
    maskRadius: 0.15,
    maskSpeed: 0.75,
    lerpFactor: 0.05,
    radiusLerpSpeed: 0.1,
    turbulenceIntensity: 0.075,
  }

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5))
  const lerpedMouse = useRef(new THREE.Vector2(0.5, 0.5))
  const targetRadius = useRef<number>(0.0)
  const isInView = useRef<boolean>(false)
  const isMouseInsideContainer = useRef<boolean>(false)
  const lastMouseX = useRef<number>(0)
  const lastMouseY = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (isSetupCompleteRef.current || !container) return

    const loader = new THREE.TextureLoader()

    const loadTexture = () => {
      loader.load(src, (texture) => {
        setupScene(texture)
        setupEventListeners()
        animate()
        isSetupCompleteRef.current = true
      })
    }

    loadTexture()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()

        if (container) {
          const canvas = container.querySelector('canvas')
          if (canvas) {
            container.removeChild(canvas)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setupScene = (texture: any) => {
    if (!containerRef.current) return

    const imageAspect = texture.image.width / texture.image.height

    texture.minFilter = THREE.LinearMipMapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = 16

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    cameraRef.current = camera

    const uniforms = {
      u_texture: {value: texture},
      u_mouse: {value: new THREE.Vector2(0.5, 0.5)},
      u_time: {value: 0.0},
      u_resolution: {value: new THREE.Vector2(width, height)},
      u_radius: {value: 0.0},
      u_speed: {value: config.maskSpeed},
      u_imageAspect: {value: imageAspect},
      u_turbulenceIntensity: {value: config.turbulenceIntensity},
    }
    uniformsRef.current = uniforms

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({antialias: true})
    rendererRef.current = renderer

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()
    texture.anisotropy = maxAnisotropy

    containerRef.current.appendChild(renderer.domElement)

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !uniformsRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      rendererRef.current.setSize(width, height)
      uniformsRef.current.u_resolution.value.set(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }

  const setupEventListeners = () => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorState(e.clientX, e.clientY)
    }

    const handleScroll = () => {
      updateCursorState(lastMouseX.current, lastMouseY.current)
    }

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInView.current = entry.isIntersecting
            if (!isInView.current) {
              targetRadius.current = 0.0
            }
          })
        },
        {threshold: 0.1}
      )

      observer.observe(containerRef.current)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('scroll', handleScroll)
        observer.disconnect()
      }
    }
  }

  const updateCursorState = (x: number, y: number) => {
    if (!containerRef.current) return

    lastMouseX.current = x
    lastMouseY.current = y

    const rect = containerRef.current.getBoundingClientRect()
    const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom

    isMouseInsideContainer.current = inside

    if (inside) {
      targetMouse.current.x = (x - rect.left) / rect.width
      targetMouse.current.y = 1.0 - (y - rect.top) / rect.height
      targetRadius.current = config.maskRadius
    } else {
      targetRadius.current = 0.0
    }
  }

  const animate = () => {
    if (!uniformsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
      animationFrameId.current = requestAnimationFrame(animate)
      return
    }

    // Smooth interpolation
    lerpedMouse.current.lerp(targetMouse.current, config.lerpFactor)

    // Update shader uniforms
    uniformsRef.current.u_mouse.value.copy(lerpedMouse.current)
    uniformsRef.current.u_time.value += 0.01
    uniformsRef.current.u_radius.value += (targetRadius.current - uniformsRef.current.u_radius.value) * config.radiusLerpSpeed

    // Render the scene
    rendererRef.current.render(sceneRef.current, cameraRef.current)

    // Continue the loop
    animationFrameId.current = requestAnimationFrame(animate)
  }

  return (
    <div className='relative mx-auto aspect-[448/576] w-full max-w-md'>
      <div ref={containerRef} className='h-full w-full overflow-hidden object-cover [&>canvas]:rounded-3xl' />
    </div>
  )
}

export default InversionLens
