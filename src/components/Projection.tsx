import React from 'react'
import { geoGraticule, geoPath } from 'd3'

type ProjectionProps = {
    projectionType: any
}

const width = 600
const height = 300

export const Projection = ({ projectionType }: ProjectionProps) => {
    // create graticules
    const graticules = geoGraticule()

    // create a projection generator based on the input projection
    // WHY does this work with the sphere input
    const projection = projectionType
        .projection()
        .fitSize([width, height], { type: 'Sphere' })

    // this is the geographic path generator or SOMETHING
    const path = geoPath(projection)

    return (
        <svg width={width} height={height}>
            <g id={`projection-${projectionType}`}>
                <path
                    className="fill-blue-200 stroke-black stroke-1"
                    id="sphere"
                    d={path({ type: 'Sphere' }) as string | undefined}
                />
                <path
                    className="fill-none stroke-black stroke-1"
                    id={`projection-${projectionType}-graticules`}
                    d={path(graticules()) as string | undefined}
                />
            </g>
        </svg>
    )
}
