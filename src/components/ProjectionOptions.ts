import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

export const projectionOptions: { [name: string]: any } = {
    'Airy Minimum Error': d3GeoProjection.geoAiry,
    'Mercator': d3.geoMercator,
    'Albers': d3.geoAlbers,
    'Equirectangular': d3.geoEquirectangular,
    'Azimuthal Equidistant': d3.geoAzimuthalEquidistant,
}

export const objectProjectionOptions = [
    { name: 'Airy Minimum Error', projection: d3GeoProjection.geoAiry },
    { name: 'Mercator', projection: d3.geoMercator },
    { name: 'Albers', projection: d3.geoAlbers },
    { name: 'Equirectangular', projection: d3.geoEquirectangular },
    { name: 'Azimuthal Equidistant', projection: d3.geoAzimuthalEquidistant },
]
