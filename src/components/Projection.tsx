import React, { useCallback, useEffect, useRef } from 'react'

import { easeCubic, geoGraticule, geoPath, GeoProjection, select } from 'd3'
import { interpolateProjection, projectionTween } from '../infrastructure/utils'
type ProjectionProps = {
    currentProjection: any
    setCurrentProjection: any
    nextProjection: any | null
    worldAtlas: any
}

const width = 600
const height = 300

export const Projection = ({
    currentProjection,
    nextProjection,
    setCurrentProjection,
    worldAtlas,
}: ProjectionProps) => {
    // initialize a reference to use with projection paths
    const projectionRef = useRef(null)

    // callback to animate between projection types
    const animateTransition = useCallback(() => {
        projectionRef.current &&
            select(projectionRef.current)
                .selectAll('path')
                .transition()
                .ease(easeCubic)
                .duration(2000)
                .attrTween(
                    'd',
                    projectionTween(
                        currentProjection.projection as any,
                        nextProjection.projection as any,
                        width,
                        height
                    ) as any
                )
    }, [currentProjection, nextProjection])

    const projection = interpolateProjection(
        currentProjection.projection as any,
        currentProjection.projection as any,
        width,
        height
    ).alpha(0) as GeoProjection

    useEffect(() => {
        // create graticules
        const graticules = geoGraticule()

        // this is the geographic path generator or SOMETHING
        const path = geoPath(projection)
        // bind sphere and graticule data to projection references in a very D3 way
        console.log('executed')
        projectionRef.current &&
            select(projectionRef.current)
                .selectAll('path')
                .data([{ type: 'Sphere' }, graticules()].concat(worldAtlas.land.features))
                .attr('d', path as any)
    }, [])

    useEffect(() => {
        if (nextProjection) {
            animateTransition()
            setTimeout(() => {
                setCurrentProjection(nextProjection)
            }, 2000)
        }
    }, [animateTransition, nextProjection, setCurrentProjection])
    return (
        <svg width={width} height={height} className="fill-none">
            <g ref={projectionRef}>
                <path className="fill-none stroke-slate-400" />
                <path className="fill-none stroke-slate-400" />
                {worldAtlas.land.features.map((feature: any) => (
                    <path className="fill-emerald-800 opacity-50" />
                ))}
            </g>
        </svg>
    )
}
