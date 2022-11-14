import React from 'react'
import { geoGraticule, geoPath } from 'd3'
import { projectionOptions } from './ProjectionOptions'

type ProjectionProps = {
    projectionType: string
}

export const Projection = ({ projectionType }: ProjectionProps) => {
    // create a projection generator based on the input projection
    const projection = projectionOptions[projectionType]()
    const path = geoPath(projection)

    // create graticules
    const graticules = geoGraticule()

    return (
        <g className={`projection-${projectionType}`}>
            <path
                className={`projection-${projectionType}-graticules`}
                d={path(graticules()) as string | undefined}
            />
        </g>
    )
}
