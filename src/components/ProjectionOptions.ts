import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

export const projectionOptions = [
    { name: 'Equirectangular', projection: d3.geoEquirectangularRaw, renderSphere: true },
    {
        name: 'Azimuthal Equidistant',
        projection: d3.geoAzimuthalEquidistantRaw,
        renderSphere: true,
    },
    { name: 'Azimuthal Equal Area', projection: d3.geoAzimuthalEqualAreaRaw, renderSphere: true },
    { name: 'Eckert I', projection: d3GeoProjection.geoEckert1Raw, renderSphere: true },
    { name: 'American Polyconic', projection: d3GeoProjection.geoPolyconicRaw, renderSphere: true },
    { name: 'Orthographic', projection: d3.geoOrthographicRaw, renderSphere: true },
    { name: 'Larrivee', projection: d3GeoProjection.geoLarriveeRaw, renderSphere: true },
    { name: 'Aitoff', projection: d3GeoProjection.geoAitoffRaw, renderSphere: true },
    { name: 'Eisenlohr', projection: d3GeoProjection.geoEisenlohrRaw, renderSphere: true },
    { name: 'Stereographic', projection: d3.geoStereographicRaw, renderSphere: false },
    { name: 'Mercator', projection: d3.geoMercatorRaw, renderSphere: false },
    { name: 'Lagrange', projection: d3GeoProjection.geoLagrangeRaw(0.5), renderSphere: true },
    { name: 'Littrow', projection: d3GeoProjection.geoLittrowRaw, renderSphere: true },
    { name: 'August', projection: d3GeoProjection.geoAugustRaw, renderSphere: true },
    {
        name: 'Lambert Conformal Conic',
        projection: d3.geoConicConformalRaw(20, 50),
        renderSphere: true,
    },
]
