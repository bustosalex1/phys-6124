import { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature, mesh } from 'topojson'

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'
export const useWorldAtlas = () => {
    const [data, setData] = useState<any>()

    useEffect(() => {
        json(jsonUrl).then((topology: any) => { // typescript hard :(
            const { countries, land } = topology.objects
            setData({
                land: feature(topology, land),
                interiors: mesh(topology, countries, (a, b) => (a !== b))
            }) // convert topoJSON to geoJSON, also get a list of only the borders between countries, also get a list of only the borders between countries
        })
    }, [])

    return data
}