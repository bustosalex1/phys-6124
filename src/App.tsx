import React from 'react'
import { useState } from 'react'
import { Projection } from './components/Projection'
import { projectionOptions } from './components/ProjectionOptions'
import DropdownMenu from './components/DropdownMenu'
import { useWorldAtlas } from './infrastructure/useWorldAtlas'

const App = () => {
    /** Roadmap */
    // 3. map of mars
    // 4. dragging
    const worldAtlas = useWorldAtlas()

    const [currentProjection, setCurrentProjection] = useState(projectionOptions[0])
    const [nextProjection, setNextProjection] = useState(null)

    if (!worldAtlas) {
        return <div> Loading...</div>
    }

    return (
        <>
            <div className="p-10 text-center text-4xl text-white font-semibold font-serif drop-shadow-xl">
                PHYS 6124 Final Project
            </div>
            <div className="flex items-center justify-center flex-row space-x-10">
                <div className="p-5 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <div className="flex items-start justify-start flex-col space-y-5">
                        <div className="text-center text-lg font-semibold">
                            Projection Parameters
                        </div>
                        <DropdownMenu
                            options={projectionOptions}
                            label="Projection"
                            selectedValue={currentProjection}
                            setSelectedValue={setNextProjection}
                        />
                    </div>
                </div>
                <div className="p-20 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <Projection
                        currentProjection={currentProjection}
                        setCurrentProjection={setCurrentProjection}
                        nextProjection={nextProjection}
                        worldAtlas={worldAtlas}
                    />
                </div>
            </div>
        </>
    )
}

export default App
