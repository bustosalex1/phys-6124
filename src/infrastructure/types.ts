export enum Projection {
    Equirectangular,
    Mercator,
    Robinson,
    LambertConformalConic,
}

export type Map = {
    name: string
    file: string
    projection: Projection
}
