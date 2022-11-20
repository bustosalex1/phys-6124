import React from 'react'

type DropdownMenuProps = {
    options: any[]
    label: string
    setSelectedValue?: any
    selectedValue?: any
}

const DropdownMenu = ({ options, label, setSelectedValue, selectedValue }: DropdownMenuProps) => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => {
                    setSelectedValue(options.find((option) => option.name === e.target.value))
                }}
                value={selectedValue.name}
            >
                {options.map((option) => (
                    <option value={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default DropdownMenu
