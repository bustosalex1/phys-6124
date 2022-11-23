import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

export const projectionOptions = [
    { name: 'Equirectangular', projection: d3.geoEquirectangularRaw },
    { name: 'Azimuthal Equidistant', projection: d3.geoAzimuthalEquidistantRaw },
    { name: 'Azimuthal Equal Area', projection: d3.geoAzimuthalEqualAreaRaw },
    { name: 'Eckert I', projection: d3GeoProjection.geoEckert1Raw },
    { name: 'American Polyconic', projection: d3GeoProjection.geoPolyconicRaw },
    { name: 'Orthographic', projection: d3.geoOrthographicRaw },
    { name: 'Conic Equidistant', projection: d3.geoConicEquidistantRaw(5, 5) },
    { name: 'Larrivee', projection: d3GeoProjection.geoLarriveeRaw },
    { name: 'Aitoff', projection: d3GeoProjection.geoAitoffRaw },
    { name: 'Eisenlohr', projection: d3GeoProjection.geoEisenlohrRaw },
    { name: 'Stereographic', projection: d3.geoStereographicRaw },
    { name: 'Mercator', projection: d3.geoMercatorRaw },
]
