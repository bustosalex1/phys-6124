import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    easeCubic,
    geoGraticule,
    geoOrthographic,
    geoPath,
    geoProjection,
    GeoProjection,
    select,
} from 'd3'

import { interpolateProjection, dragGenerator } from '../infrastructure/utils'
import land110m from 'world-atlas/land-110m.json'
import { feature } from 'topojson'

type ProjectionProps = {
    currentProjection: any
    setCurrentProjection: any
    setNextProjection: any
    nextProjection: any | null
    useAtlas?: boolean
    width: number
    height: number
    label: string
    scale?: number
    resolution: number
    animationDuration: number
}

// all of this is bad
// make a slider for animationDuration please!

// can we move this elsewhere?
const graticules = geoGraticule()
const land = feature(land110m as any, land110m.objects.land as any)

export const ProjectionCanvas = ({
    currentProjection,
    nextProjection,
    setCurrentProjection,
    setNextProjection,
    useAtlas,
    width,
    height,
    label,
    scale = 100,
    resolution,
    animationDuration,
}: ProjectionProps) => {
    // refs for the canvas and canvas context so we can access them elsewhere in a cool typed way
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

    // I can't believe I'm doing this
    const orthoCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const orthoCanvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

    // state variable for the current projection, basically just to account for smooth animations
    const [currentRotation, setCurrentRotation] = useState<[number, number, number]>([0, 0, 0])

    // function to draw frames; uses useCallback so other things know that this doesn't change.
    const draw = useCallback(
        (ctx: CanvasRenderingContext2D, frameCount: number, projection: GeoProjection) => {
            // interpolate time with easing
            const t = easeCubic(frameCount / animationDuration)

            // clear the canvas on each frame
            ctx.clearRect(0, 0, width, height)

            // only update the projection if we're animating, basically
            if ((projection as any).alpha) {
                ;(projection as any).alpha(t) // this is pretty gross but oh well
            }

            // instantiate a path generator based on the current projection
            const path = geoPath(projection, ctx)

            // we're going to be using the same stroke for this, so go ahead and set it
            ctx.strokeStyle = '#AAA'
            ctx.lineWidth = 1

            // fill style will change but we'll go ahead and set it to white initially

            // first draw the sphere and fill it in
            if (currentProjection.renderSphere) {
                ctx.beginPath()
                path({ type: 'Sphere' })
                ctx.stroke()
                ctx.fillStyle = 'white'
                ctx.fill()
            }

            // then draw the graticules
            ctx.beginPath()
            path(graticules())
            ctx.stroke()

            // finally draw the atlas, if it is enabled
            if (useAtlas) {
                ctx.beginPath()
                path(land)
                ctx.fillStyle = 'rgb(6, 95, 70)'
                ctx.fill()
            }
        },
        [useAtlas, height, width, currentProjection, animationDuration]
    )

    // callback function to animate the transition between projections
    const animateTransition = useCallback(() => {
        if (nextProjection && currentProjection) {
            const interpolatedProjection = interpolateProjection(
                currentProjection.projection,
                nextProjection.projection,
                width,
                height
            )
                .precision(0.1)
                .scale(scale as any)
                .translate([width / 2, height / 2])
                .rotate(currentRotation)

            let frameCount = 0
            let animationFrameId = 0

            const render = () => {
                if (frameCount >= animationDuration) {
                    return
                }

                draw(canvasCtxRef.current!, frameCount, interpolatedProjection)
                frameCount++
                animationFrameId = window.requestAnimationFrame(render)
            }

            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [
        draw,
        currentProjection,
        currentRotation,
        width,
        height,
        nextProjection,
        scale,
        animationDuration,
    ])

    useEffect(() => {
        // instantiate canvas context once on page load
        if (
            canvasRef.current &&
            (canvasCtxRef.current = canvasRef.current.getContext('2d')) &&
            orthoCanvasRef.current &&
            (orthoCanvasCtxRef.current = orthoCanvasRef.current.getContext('2d'))
        ) {
            // typing out canvasCtxRef.current gets tiring, so assign it to a variable
            let ctx = canvasCtxRef.current
            let orthoCtx = orthoCanvasCtxRef.current

            // set the width and height of the canvas
            ctx.canvas.width = width * resolution
            ctx.canvas.height = height * resolution

            ctx.canvas.style.width = width + 'px'
            ctx.canvas.style.height = height + 'px'

            orthoCtx.canvas.width = width * resolution
            orthoCtx.canvas.height = height * resolution

            orthoCtx.canvas.style.width = width + 'px'
            orthoCtx.canvas.style.height = height + 'px'

            orthoCtx.scale(resolution, resolution)
            ctx.scale(resolution, resolution)

            // set the currently active projection
            const initialProjection = geoProjection(currentProjection.projection)
                .scale(scale)
                .precision(0.1)
                .translate([width / 2, height / 2])
                .rotate(currentRotation)

            const orthoProjection = geoOrthographic()
                .scale(scale)
                .precision(0.1)
                .translate([width / 2, height / 2])
                .rotate(currentRotation)

            // apply the drag functionality to the canvas
            select(canvasRef.current).call(
                dragGenerator(initialProjection, orthoProjection)
                    .on('drag.render', () => {
                        draw(orthoCtx, 0, orthoProjection)
                        draw(ctx, 0, initialProjection)
                    })
                    .on('end.render', () => {
                        setCurrentRotation(initialProjection.rotate())
                    }) as any
            )

            select(orthoCanvasRef.current).call(
                dragGenerator(orthoProjection, initialProjection)
                    .on('drag.render', () => {
                        draw(orthoCtx, 0, orthoProjection)
                        draw(ctx, 0, initialProjection)
                    })
                    .on('end.render', () => {
                        setCurrentRotation(initialProjection.rotate())
                    }) as any
            )

            // draw the initial frame
            draw(ctx, 0, initialProjection)
            draw(orthoCtx, 0, orthoProjection)

            // set the active projection
            setCurrentRotation(initialProjection.rotate())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProjection, useAtlas, scale, resolution])

    useEffect(() => {
        if (nextProjection) {
            animateTransition()
            setCurrentProjection({ ...nextProjection })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextProjection])

    return (
        <div className="flex flex-row space-x-5">
            <div className="flex flex-col space-y-1 items-center">
                <div className="bg-white rounded-md border-1 border-gray-300">
                    <canvas ref={canvasRef} className="rounded-lg" />
                </div>
                <h4>{label}</h4>
            </div>
            <div className="flex flex-col space-y-1 items-center">
                <div className="bg-white rounded-md border-1 border-gray-300">
                    <canvas ref={orthoCanvasRef} className="rounded-lg" />
                </div>
                <h4>Orthographic</h4>
            </div>
        </div>
    )
}
