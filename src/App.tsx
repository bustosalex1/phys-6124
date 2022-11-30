import React from 'react'
import { useState } from 'react'
import { projectionOptions } from './components/ProjectionOptions'
import DropdownMenu from './components/DropdownMenu'
import { ProjectionCanvas } from './components/ProjectionCanvas'
import { MathJax } from 'better-react-mathjax'

const App = () => {
    // state variable to manage whether or not the world atlas is visible
    const [atlasEnabled, setAtlasEnabled] = useState<boolean>(true)

    // state variable to manage the current projection
    const [currentProjection, setCurrentProjection] = useState(projectionOptions[1])

    // state variable to manage the next projection; i.e., the projection to transition to
    const [nextProjection, setNextProjection] = useState(null)

    // state variable to manage the scale of the projection
    const [scale, setScale] = useState<number>(100)

    // state variable to manage the speed of the animations (proportional to the number of frames in an animation)
    const [animationDuration, setAnimationDuration] = useState<number>(200)

    return (
        <>
            {/* Title Text */}
            <div className="p-10 text-center">
                <div className="text-4xl font-semibold">
                    PHYS 6124 Final Project: Conformal Map Explorer
                </div>
                <div className="text-md">by Sabastian Abelezele and Alex Bustos</div>
            </div>

            {/* Outermost container for Projection Parameters div and Projection Canvas div */}
            <div className="flex justify-center flex-row gap-10 flex-wrap">
                {/* Projection Parameters div */}
                <div className="p-5 rounded-md border-1 border-black drop-shadow-xl flex justify-start flex-col space-y-1 bg-white w-full max-w-sm">
                    {/* Projection Parameters title text */}
                    <div className="text-center text-lg font-semibold">Projection Settings</div>
                    {/* Dropdown menu for projection options */}
                    <DropdownMenu
                        options={projectionOptions}
                        label="Projection"
                        selectedValue={currentProjection}
                        setSelectedValue={setNextProjection}
                    />
                    {/* Display Component for Projection Equations */}

                    {currentProjection.formula && (
                        <div
                            className="self-center border-1 p-2 border-gray-300 rounded-md flex flex-col space-y-1 w-full items-center"
                            style={{ visibility: currentProjection.formula ? 'visible' : 'hidden' }}
                        >
                            <MathJax dynamic>{currentProjection.formula}</MathJax>
                            <span className="label-text p-1">Base Projection</span>
                        </div>
                    )}
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
                                className="range w-6/12"
                                onChange={(event) => {
                                    setScale(+event.target.value)
                                }}
                            />
                            <span className="label-text p-1">Zoom</span>
                        </label>
                    </div>
                    {/* Slider to set animation speed */}
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input
                                type="range"
                                min="1"
                                max="300"
                                value={animationDuration}
                                className="range w-6/12"
                                onChange={(event) => {
                                    setAnimationDuration(+event.target.value)
                                }}
                            />
                            <span className="label-text">Animation Duration</span>
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
                        width={450} // bad practice, I'm sure
                        height={450} // likewise
                        scale={scale}
                        label={currentProjection.name}
                        resolution={2}
                        animationDuration={animationDuration}
                    />
                </div>
            </div>
        </>
    )
}

export default App
