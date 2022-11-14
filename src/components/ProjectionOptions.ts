import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

export const projectionOptions: {[name: string]: any} = {
    'Airy Minimum': d3GeoProjection.geoAiry,
    'Mercator': d3.geoMercator,
    'albers': d3.geoAlbers,
    'equirectangular': d3.geoEquirectangular,
    'azimuthal equidistant': d3.geoAzimuthalEquidistant
}