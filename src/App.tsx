import React from 'react'
import { useState } from 'react'
import { projectionOptions } from './components/ProjectionOptions'
import DropdownMenu from './components/DropdownMenu'
import { useWorldAtlas } from './infrastructure/useWorldAtlas'
import { ProjectionCanvas } from './components/ProjectionCanvas'

const App = () => {
    const [atlasEnabled, setAtlasEnabled] = useState<boolean>(true)
    const worldAtlas = useWorldAtlas()

    const [currentProjection, setCurrentProjection] = useState(projectionOptions[5])
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
                        <div className="text-center text-lg font-semibold text-black">
                            Projection Parameters
                        </div>
                        <DropdownMenu
                            options={projectionOptions}
                            label="Projection"
                            selectedValue={currentProjection}
                            setSelectedValue={setNextProjection}
                        />
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={atlasEnabled}
                                    onChange={(_) => {
                                        setAtlasEnabled(!atlasEnabled)
                                    }}
                                />
                                <span className="label-text text-black p-1">Atlas</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="p-20 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <ProjectionCanvas
                        currentProjection={currentProjection}
                        setCurrentProjection={setCurrentProjection}
                        nextProjection={nextProjection}
                        setNextProjection={setNextProjection}
                        worldAtlas={atlasEnabled ? worldAtlas : undefined}
                    />
                </div>
            </div>
        </>
    )
}

export default App
