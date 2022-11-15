import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

export const projectionOptions = [
    { name: 'Airy Minimum Error', projection: d3GeoProjection.geoAiry },
    { name: 'Mercator', projection: d3.geoMercator },
    { name: 'Albers', projection: d3.geoAlbers },
    { name: 'Equirectangular', projection: d3.geoEquirectangular },
    { name: 'Azimuthal Equidistant', projection: d3.geoAzimuthalEquidistant },
    { name: 'Eckert I', projection: d3GeoProjection.geoEckert1 },
    { name: 'American Polyconic', projection: d3GeoProjection.geoPolyconic },
    {
        name: 'Cylindrical Stereographic',
        projection: d3GeoProjection.geoCylindricalStereographic,
    },
    {
        name: 'Hill Eucyclic',
        projection: d3GeoProjection.geoHill
    }
]
