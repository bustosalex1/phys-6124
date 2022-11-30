import * as d3 from 'd3'
import * as d3GeoProjection from 'd3-geo-projection'

export const projectionOptions = [
    { name: 'Conformal Projections', projection: null },
    {
        name: 'August',
        projection: d3GeoProjection.geoAugustRaw,
        renderSphere: true,
        formula: String.raw`\( f(z) = \frac{i}{2} \left(3 \tanh{\left( \bar{z} \right)} - \tanh{\left( \bar{z} \right)}^{3} \right) \)`,
    },
    {
        name: 'Eisenlohr',
        projection: d3GeoProjection.geoEisenlohrRaw,
        renderSphere: true,
        formula: String.raw`\( f(z) = \frac{2}{i} \left(z \right) + \sqrt{2} \sinh{\left( \bar{z} \right)} \)`,
    },
    {
        name: 'Lagrange',
        projection: d3GeoProjection.geoLagrangeRaw(0.5),
        renderSphere: true,
        formula: String.raw`\( f(z) = \tan{\left(\frac{z}{4}\right)} \)`,
    },
    {
        name: 'Lambert Conformal Conic',
        projection: d3.geoConicConformalRaw(20, 50),
        renderSphere: true,
        formula: String.raw`\( \begin{cases}x(a, b) & =\rho_0 e^{-t\left(b-b_0\right)} \sin (t a) \\ y(a, b) & =\rho_0-\rho_0 e^{-t\left(b-b_0\right)} \cos (t a)\end{cases} \)`
    },
    {
        name: 'Littrow (Slow!)',
        projection: d3GeoProjection.geoLittrowRaw,
        renderSphere: true,
        formula: String.raw`\( f(z) = \frac{i}{2}\left(e^{z} - e^{-z} \right) \)`,
    },
    {
        name: 'Mercator',
        projection: d3.geoMercatorRaw,
        renderSphere: true,
        formula: String.raw`\( f(z) = Rz \)`,
    },
    {
        name: 'Stereographic',
        projection: d3.geoStereographicRaw,
        renderSphere: false,
        formula: String.raw`\( f(z) = -2Re^{-z} \)`,
    },
    { name: 'Nonconformal Projections', projection: null },
    { name: 'Aitoff', projection: d3GeoProjection.geoAitoffRaw, renderSphere: true },
    { name: 'Azimuthal Equal Area', projection: d3.geoAzimuthalEqualAreaRaw, renderSphere: true },
    {
        name: 'Azimuthal Equidistant',
        projection: d3.geoAzimuthalEquidistantRaw,
        renderSphere: false,
    },
    { name: 'Collignon', projection: d3GeoProjection.geoCollignonRaw, renderSphere: true },
    { name: 'Eckert I', projection: d3GeoProjection.geoEckert1Raw, renderSphere: true },
    { name: 'Equirectangular', projection: d3.geoEquirectangularRaw, renderSphere: true },
    { name: 'Larrivee', projection: d3GeoProjection.geoLarriveeRaw, renderSphere: true },
    { name: 'Sinu-Mollweide', projection: d3GeoProjection.geoSinuMollweideRaw, renderSphere: true },
]
