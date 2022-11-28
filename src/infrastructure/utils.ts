import { GeoRawProjection, geoProjectionMutator, GeoProjection } from 'd3-geo'
import { drag } from 'd3'
import versor from 'versor'

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
            return arguments.length ? mutate((t = +_)) : t
        },
    })

    if (width && height) {
        return mutatedProjection.fitSize([width, height], { type: 'Sphere' })
    } else {
        return mutatedProjection
    }
}

export const dragGenerator = (projection: any, projection2: any) => {
    let v0: any, q0: any, r0: any

    const dragStarted = (event: any) => {
        v0 = versor.cartesian(projection.invert([event.x, event.y]))
        q0 = versor((r0 = projection.rotate()))
    }

    const dragged = (event: any) => {
        const v1 = versor.cartesian(projection.rotate(r0).invert([event.x, event.y]))
        const q1 = versor.multiply(q0, versor.delta(v0, v1))
        projection.rotate(versor.rotation(q1))
        projection2.rotate(versor.rotation(q1))
    }

    return drag().on('start', dragStarted).on('drag', dragged)
}
