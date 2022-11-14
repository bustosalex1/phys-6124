import React from 'react'
import { Projection } from './components/Projection'

const App = () => {
    return (
        <div className="bg-slate-700 h-screen flex items-center justify-start flex-col space-y-10 p-20">
            <div className="text-center text-4xl text-white font-semibold font-serif drop-shadow-xl">
                PHYS 6124 Final Project
            </div>
            <div className="p-20 bg-white rounded-md border-1 border-black drop-shadow-xl">
                <Projection projectionType="Airy Minimum" />
            </div>
        </div>
    )
}

export default App
