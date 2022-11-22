import React, { useCallback, useEffect, useRef } from 'react'

import {
    easeCubic,
    geoAzimuthalEqualAreaRaw,
    geoEquirectangular,
    geoGraticule,
    geoPath,
    select,
} from 'd3'
import { interpolateProjection, projectionTween } from '../infrastructure/utils'
type ProjectionProps = {
    currentProjection: any
    setCurrentProjection: any
    nextProjection: any | null
    worldAtlas?: any
}

const width = 600
const height = 300

export const ProjectionCanvas = ({
    currentProjection,
    nextProjection,
    setCurrentProjection,
    worldAtlas,
}: ProjectionProps) => {
    // initialize a reference to use with projection paths
    const projectionRef = useRef(null)

    // HTML canvas here we come
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

    // callback to animate between projection types
    // const animateTransition = useCallback(() => {
    //     projectionRef.current &&
    //         select(projectionRef.current)
    //             .selectAll('path')
    //             .transition()
    //             .ease(easeCubic)
    //             .duration(2000)
    //             .attrTween(
    //                 'd',
    //                 projectionTween(
    //                     currentProjection.projection as any,
    //                     nextProjection.projection as any,
    //                     width,
    //                     height
    //                 ) as any
    //             )

    //     const info =
    //         projectionRef.current && select(projectionRef.current).selectAll('path').attr('d')
    //     console.log(info)
    // }, [currentProjection, nextProjection])

    const projection = interpolateProjection(
        currentProjection.projection as any,
        geoAzimuthalEqualAreaRaw as any,
        width * 3,
        height * 3
    )
        .alpha(0)
        .rotate([30, 30, 30])

    const graticules = geoGraticule()
    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        frameCount = frameCount % 150
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        let currProj = projection as any
        currProj
            .alpha(frameCount / 150)
            .fitSize([width * 3, height * 3], { type: 'Sphere' })
            .rotate([30, 30, frameCount])
        const path = geoPath(projection, ctx)
        ctx!.canvas.style.width = width + 'px'
        ctx!.canvas.style.height = height + 'px'
        ctx!.canvas.width = width * 3
        ctx!.canvas.height = height * 3
        ctx!.clearRect(0, 0, width, height)
        ctx!.beginPath()
        path(graticules())
        ctx!.lineWidth = 1
        ctx!.strokeStyle = '#AAA'
        ctx!.stroke()
    }

    // useEffect(() => {
    //     // create graticules
    //     const graticules = geoGraticule()

    //     // this is the geographic path generator or SOMETHING
    //     const path = geoPath(projection)
    //     // bind sphere and graticule data to projection references in a very D3 way

    //     if (worldAtlas) {
    //         projectionRef.current &&
    //             select(projectionRef.current)
    //                 .selectAll('path')
    //                 .data([{ type: 'Sphere' }, graticules()].concat(worldAtlas.land.features))
    //                 .attr('d', path as any)
    //     } else {
    //         projectionRef.current &&
    //             select(projectionRef.current)
    //                 .selectAll('path')
    //                 .data([{ type: 'Sphere' }, graticules()])
    //                 .attr('d', path as any)
    //     }
    // }, [worldAtlas])

    // useEffect(() => {
    //     if (nextProjection) {
    //         animateTransition()
    //         setTimeout(() => {
    //             setCurrentProjection(nextProjection)
    //         }, 2000)
    //     }
    // }, [animateTransition, nextProjection, setCurrentProjection])

    useEffect(() => {
        // instantiate canvas context once on load
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d')

            let frameCount = 0
            let animationFrameId: number

            const render = () => {
                frameCount++
                draw(canvasCtxRef.current!, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }
            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
            // let ctx = canvasCtxRef.current

            // const path = geoPath(testProjection, ctx)
            // ctx!.canvas.style.width = width + 'px'
            // ctx!.canvas.style.height = height + 'px'
            // ctx!.canvas.width = width * 3
            // ctx!.canvas.height = height * 3
            // ctx!.clearRect(0, 0, width, height)
            // ctx!.beginPath()
            // path(graticules())
            // ctx!.lineWidth = 1
            // ctx!.strokeStyle = '#AAA'
            // ctx!.stroke()
        }
    }, [])

    return <canvas ref={canvasRef}></canvas>
}
