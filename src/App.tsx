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
            {/* Title Text */}
            <div className="p-10 text-center text-4xl font-semibold drop-shadow-xl">
                PHYS 6124 Final Project
            </div>
            {/* Outermost container for Projection Parameters div and Projection Canvas div */}
            <div className="flex items-center justify-center flex-row space-x-10">
                {/* Projection Parameters div */}
                <div className="p-5 rounded-md border-1 border-black drop-shadow-xl flex iterms-start justify-start flex-col space-y-2 h-full bg-white">
                    {/* Projection Parameters title text */}
                    <div className="text-center text-lg font-semibold">Projection Parameters</div>
                    {/* Dropdown menu for projection options */}
                    <DropdownMenu
                        options={projectionOptions}
                        label="Projection"
                        selectedValue={currentProjection}
                        setSelectedValue={setNextProjection}
                    />
                    {/* Toggle for enabling/disabling world atlas shapes */}
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
                            <span className="label-text p-1">Atlas</span>
                        </label>
                    </div>
                    {/* Slider to set zoom value */}
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                value={scale}
                                className="range"
                                onChange={(event) => {
                                    setScale(+event.target.value)
                                }}
                            />
                            <span className="label-text p-1">Zoom</span>
                        </label>
                    </div>
                </div>

                {/* div for Projection Canvas */}
                <div className="p-5 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <ProjectionCanvas
                        currentProjection={currentProjection}
                        setCurrentProjection={setCurrentProjection}
                        nextProjection={nextProjection}
                        setNextProjection={setNextProjection}
                        useAtlas={atlasEnabled}
                        width={450} // made this up, basically
                        height={450} // also made this up
                        scale={scale}
                        label={currentProjection.name}
                        resolution={2}
                    />
                </div>
            </div>
        </>
    )
}

export default App
