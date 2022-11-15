import React from 'react'
import { useState } from 'react'
import DropdownMenu from './components/DropdownMenu'
import { Projection } from './components/Projection'
import { projectionOptions } from './components/ProjectionOptions'

const App = () => {
    const [selectedItem, setSelectedItem] = useState(projectionOptions[0])

    // refactor this!
    return (
        <div className="bg-slate-700 h-screen flex items-center justify-start flex-col space-y-10 p-20">
            <div className="text-center text-4xl text-white font-semibold font-serif drop-shadow-xl">
                PHYS 6124 Final Project
            </div>
            <div className="flex items-center justify-center flex-row space-x-10">
                <DropdownMenu
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                />

                <div className="p-20 bg-white rounded-md border-1 border-black drop-shadow-xl">
                    <Projection projectionType={selectedItem} />
                </div>
            </div>
        </div>
    )
}

export default App
