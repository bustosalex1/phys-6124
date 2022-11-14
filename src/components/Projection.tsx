import React from 'react'
import { geoGraticule, geoPath } from 'd3'
import { projectionOptions } from './ProjectionOptions'

type ProjectionProps = {
    projectionType: string
}

const width = 600
const height = 300

export const Projection = ({ projectionType }: ProjectionProps) => {
    // create graticules
    const graticules = geoGraticule()

    // create a projection generator based on the input projection
    // WHY does this work
    const projection = projectionOptions[projectionType]().fitSize(
        [width, height],
        { type: 'Sphere' }
    )

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
