import React from 'react'
import { SelectWrapper } from './style'

const Select = ({ defaultValue, options, onChange }) => {
    return (
        <SelectWrapper 
            onChange={onChange}
            value={defaultValue}
        >
            {options.map((option) => (
                <option
                    key={option.id}
                    value={option.id}
                >
                    {option.name}
                </option>
            ))}
        </SelectWrapper>
    )
}

export default Select