import { geoPath, GeoRawProjection, geoProjectionMutator, GeoPath, GeoProjection } from 'd3-geo'

export const interpolateProjection = (
    raw0: GeoRawProjection,
    raw1: GeoRawProjection,
    width?: number,
    height?: number
) => {
    const mutate: (t: number) => GeoProjection = geoProjectionMutator((t) => (x, y) => {
        const [x0, y0] = raw0(x, y)
        const [x1, y1] = raw1(x, y)

        return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)]
    })

    let t = 0

    const mutatedProjection = Object.assign(mutate(t), {
        alpha(_: number) {
            // return arguments.length ? mutate((t = +_)) : t
            return mutate((t = +_))
        },
    })

    if (width && height) {
        return mutatedProjection.fitSize([width, height], { type: 'Sphere' })
    } else {
        return mutatedProjection
    }
}

export const projectionTween = (
    raw0: GeoRawProjection,
    raw1: GeoRawProjection,
    width?: number,
    height?: number
) => {
    const projection = interpolateProjection(raw0, raw1, width, height)
    const path = geoPath(projection)
    return (d: any) => {
        return (t: number) => {
            if (width && height) {
                projection.alpha(t).fitSize([width, height], { type: 'Sphere' }).rotate([30, 30, 30])
            } else {
                projection.alpha(t)
            }
            return path(d)
        }
    }
}

export const existingProjectionTween = (projection: any, path: GeoPath) => {
    return (d: any) => {
        return (t: number) => {
            projection.alpha(t)
            return path(d) as string
        }
    }
}
