import d3 from 'd3'

export const projectionOptions: {[name: string]: any} = {
    'albers': d3.geoAlbers,
    'equirectangular': d3.geoEquirectangular,
    'azimuthal equidistant': d3.geoAzimuthalEquidistant
}