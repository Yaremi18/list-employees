import React from 'react'
import PropTypes from 'prop-types'
import { SelectWrapper } from './style'

const Select = ({ defaultValue, options, onChange }) => (
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

Select.propTypes = {
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Select