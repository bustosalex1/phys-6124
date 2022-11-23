import React, { useCallback, useEffect, useRef } from 'react'

import { easeCubic, geoGraticule, geoPath, geoProjection, GeoProjection } from 'd3'

import { interpolateProjection } from '../infrastructure/utils'
type ProjectionProps = {
    currentProjection: any
    setCurrentProjection: any
    setNextProjection: any
    nextProjection: any | null
    worldAtlas?: any
}

const width = 900
const height = 450
const animationDuration = 280
const graticules = geoGraticule()

export const ProjectionCanvas = ({
    currentProjection,
    nextProjection,
    setCurrentProjection,
    setNextProjection,
    worldAtlas,
}: ProjectionProps) => {
    // create refs for the canvas and canvas context so we can access them inside functions
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

    // function for drawing frames
    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, frameCount: number, projection: GeoProjection) => {
            // interpolate time with easing
            const t = easeCubic(frameCount / animationDuration)

            // clear the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            let currProj = projection as any
            currProj.alpha(t)
            const path = geoPath(projection, ctx)
            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()
            path(graticules())
            ctx.lineWidth = 2
            ctx.strokeStyle = '#AAA'
            ctx.stroke()
            ctx.beginPath()
            path({ type: 'Sphere' })
            ctx.stroke()

            if (worldAtlas) {
                ctx.beginPath()
                path(worldAtlas.land)
                ctx.fillStyle = 'rgb(6, 95, 70)'
                ctx.fill()
            }
        },
        [worldAtlas]
    )

    const animateTransition = useCallback(
        (projection: GeoProjection) => {
            let frameCount = 0
            let animationFrameId = 0

            const render = () => {
                if (frameCount >= animationDuration) {
                    return
                }

                draw(canvasCtxRef.current!, frameCount, projection)
                frameCount++
                animationFrameId = window.requestAnimationFrame(render)
            }

            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        },
        [draw]
    )

    useEffect(() => {
        // instantiate canvas context once on page load
        // only proceed if the context is non-null
        if (canvasRef.current && (canvasCtxRef.current = canvasRef.current.getContext('2d'))) {
            let ctx = canvasCtxRef.current
            ctx.canvas.style.width = width + 'px'
            ctx.canvas.style.height = height + 'px'
            ctx.canvas.width = width * 3
            ctx.canvas.height = height * 3
            const initialProjection = geoProjection(currentProjection.projection)
                .scale(300)
                .precision(0.1)
                .translate([(width * 3) / 2, (height * 3) / 2])
            console.log('called')
            const path = geoPath(initialProjection, ctx)
            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()
            path(graticules())
            ctx.lineWidth = 2
            ctx.strokeStyle = '#AAA'
            ctx.stroke()
            ctx.beginPath()
            path({ type: 'Sphere' })
            ctx.stroke()

            if (worldAtlas) {
                ctx.beginPath()
                path(worldAtlas.land)
                ctx.fillStyle = 'rgb(6, 95, 70)'
                ctx.fill()
            }
        }
    }, [currentProjection, worldAtlas])

    useEffect(() => {
        // This side effect is called whenever nextProjection changes, it's what calls the animation between projections.
        if (nextProjection && currentProjection) {
            const interpolatedProjection = interpolateProjection(
                currentProjection.projection,
                nextProjection.projection,
                width,
                height
            )
                .precision(0.1)
                .scale(300)
                .translate([(width * 3) / 2, (height * 3) / 2])

            animateTransition(interpolatedProjection)
            setNextProjection(null)
            setCurrentProjection({ ...nextProjection })
        }
    }, [
        nextProjection,
        currentProjection,
        animateTransition,
        setCurrentProjection,
        setNextProjection,
    ])

    return (
        <div className="border-1 border-black rounded-lg drop-shadow-lg bg-white">
            <canvas ref={canvasRef} />
        </div>
    )
}
