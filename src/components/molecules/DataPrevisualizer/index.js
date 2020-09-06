import React, { useMemo, useCallback, useState } from 'react'
import { Title, Subtitle, Paragraph } from '../../atoms/Text'
import {
  MainWrapper,
  Input,
} from './style'
import convertCSVtoObject from '../../../utils/convertCsvToObject'
import Table from '../../atoms/Table'
import Select from '../../atoms/Select'

const months = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10 , name: 'Octubre' },
  { id: 11 , name: 'Noviembre' },
  { id: 12 , name: 'Diciembre' },
]

const actualMonth = (new Date()).getMonth() + 1

const DataPrevisualizer = () => {
    const [headers, setHeaders] = useState([])
    const [originalData, setOriginalData] = useState([])

    const [month, setMonth] = useState(actualMonth)
    const loadFile = useCallback((data) => {
        if (!data.target?.files?.[0]) return

        const file = data.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', (event) => {
            const _result = event.target.result
            const { data: _data, headers: _headers } = convertCSVtoObject(_result)
            setOriginalData(_data)
            setHeaders(_headers)
        })

        reader.readAsText(file)
    }, [])

    const columns = useMemo(() => {
        if (!originalData.length) return []

        const _headersData = Object.keys(originalData[0])

        return headers.map((header, index) => ({
            Header: header.toUpperCase(),
            accessor: _headersData[index],
        }))
    }, [originalData, headers])

    const filterData = useCallback((byMonth) => {
        return originalData.filter((row) => {
            if (!row.mes) return false

            const _month = row.mes.split('-')[0]

            return _month === byMonth
        })
    }, [originalData])

    const filteredData = useMemo(() => {
        return filterData(month)
    }, [filterData, month])

    const totalPayments = useMemo(() => (
        filteredData.reduce((accum, row) => {
            if (!row.sueldobruto) return accum

            return accum + Number(row.sueldobruto)
        }, 0)
    ), [filteredData])


    const prevMonthData = useMemo(() => {
        let prevMonth = (month - 1 === 0 ? 12 : month - 1).toString()
        return filterData(prevMonth)
    }, [month, filterData])

    const promotedEmployees = useMemo(() => {
        let _promotedEmployees = []
        prevMonthData.forEach((prevRow) => {
            filteredData.forEach((actualRow) => {
                const actual = Number(actualRow.sueldobruto)
                const prev = Number(prevRow.sueldobruto)

                if (!(actual > prev && actualRow.id === prevRow.id)) return

                _promotedEmployees.push(actualRow)
            })
        })
        return _promotedEmployees
    }, [filteredData, prevMonthData])

    const hiredEmployees = useMemo(() => (
        filteredData.filter((actualRow) => (
            !prevMonthData.find((prevRow) => prevRow.id === actualRow.id)
        ))
    ), [prevMonthData, filteredData])

    return (
        <MainWrapper>
            <Title>Empleados</Title>     
            <Input
                type="file"
                id="file-selector"
                accept=".csv"
                onChange={loadFile}
            />
            <br />
            <Select
                options={months}
                defaultValue={month}
                onChange={({ target: { value }}) => {
                setMonth(value)
                }}
            />
            <br />

            <Table
                data={filteredData}
                columns={columns}
            />

            <Subtitle>Total</Subtitle>
            <Paragraph>{totalPayments}</Paragraph>

            <Subtitle>Empleados promocionados</Subtitle>
            {promotedEmployees.map((employee) => (
                <Paragraph key={employee.id}>{employee.nombre}</Paragraph>
            ))}

            <Subtitle>Empleados contratados</Subtitle>
            {hiredEmployees.map((employee) => (
                <Paragraph key={employee.id}>{employee.nombre}</Paragraph>
            ))}

        </MainWrapper>
    )
}

export default DataPrevisualizer
