import React from 'react'
import { useState } from 'react'
import { projectionOptions } from './components/ProjectionOptions'
import DropdownMenu from './components/DropdownMenu'
import { ProjectionCanvas } from './components/ProjectionCanvas'

const App = () => {
    // state variable to manage whether or not the world atlas is visible
    const [atlasEnabled, setAtlasEnabled] = useState<boolean>(true)

    // state variable to manage the current projection
    const [currentProjection, setCurrentProjection] = useState(projectionOptions[0])

    // state variable to manage the next projection; i.e., the projection to transition to
    const [nextProjection, setNextProjection] = useState(null)

    // state variable to manage the scale of the projection
    const [scale, setScale] = useState<number>(100)

    return (
        <>
            <div className="p-10 text-center text-4xl font-semibold drop-shadow-xl">
                PHYS 6124 Final Project
            </div>
            <div className="flex items-center justify-center flex-row space-x-10">
                <div className="p-5 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <div className="flex items-start justify-start flex-col space-y-2">
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
                                    className="toggle "
                                    checked={atlasEnabled}
                                    onChange={(_) => {
                                        setAtlasEnabled(!atlasEnabled)
                                    }}
                                />
                                <span className="label-text text-black p-1">Atlas</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="range"
                                    min="10"
                                    max="500"
                                    value={scale}
                                    className="range"
                                    onChange={(event) => {
                                        setScale(+event.target.value)
                                    }}
                                />
                                <span className="label-text text-black p-1">Scale</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <ProjectionCanvas
                        currentProjection={currentProjection}
                        setCurrentProjection={setCurrentProjection}
                        nextProjection={nextProjection}
                        setNextProjection={setNextProjection}
                        useAtlas={atlasEnabled}
                        width={450}
                        height={450}
                        scale={scale}
                        label={currentProjection.name}
                    />
                </div>
            </div>
        </>
    )
}

export default App
