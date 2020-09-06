import React, { useEffect } from 'react'
import { useTable } from 'react-table'
import PropTypes from 'prop-types'
import Input from '../../atoms/Input'
import {
    TableWrapper,
    THead,
    TBody,
} from './style'

// Editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <Input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

const Table = ({ columns, data, updateMyData }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        defaultColumn,
        updateMyData,
    })

    return (
        <TableWrapper cellSpacing="0" {...getTableProps()} key="d">
            <THead>
            {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i1) => (
                        <th key={i1} {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </THead>
            <TBody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr  key={i} {...row.getRowProps()}>
                            {row.cells.map((cell, i1) => {
                                return <td  key={i1} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </TBody>
        </TableWrapper>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    updateMyData: PropTypes.func.isRequired,
}

export default Table