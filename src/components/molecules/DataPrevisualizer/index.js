import React, { useMemo, useCallback, useState } from 'react'
import { Title, Subtitle, Paragraph } from '../../atoms/Text'
import convertCSVtoObject from '../../../utils/convertCsvToObject'
import Table from '../../atoms/Table'
import Select from '../../atoms/Select'
import {
    MainWrapper,
    Input,
    ColumnWrapper,
    DirectionWrapper,
} from './style'
import Separator from '../../atoms/Separator'
import OrganizationChart from '../OrganizationChart'

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
    const [fileLoaded, setFileLoaded] = useState(false)
    const [headers, setHeaders] = useState([])
    const [originalData, setOriginalData] = useState([])
    const [month, setMonth] = useState(actualMonth)

    const loadFile = useCallback(({ target }) => {
        const file = target?.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.addEventListener('load', (event) => {
            setFileLoaded(true)
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

            {fileLoaded && (
                <>
                    <ColumnWrapper>
                        <Paragraph>Filtrar por mes:</Paragraph>
                        <Select
                            options={months}
                            defaultValue={month}
                            onChange={({ target: { value }}) => {
                                setMonth(value)
                            }}
                        />
                    </ColumnWrapper>
                    
                    <br />
                    <Table
                        data={filteredData}
                        columns={columns}
                    />
                    {filteredData.length === 0 && (
                        <DirectionWrapper direction="center">
                            <Paragraph>No hay datos para este mes</Paragraph>
                        </DirectionWrapper>
                    )}

                    <br /> <br />

                    <DirectionWrapper direction="flex-end">
                        <Subtitle color="white">Sueldo bruto total <Subtitle>{`$${totalPayments}`}</Subtitle></Subtitle>
                    </DirectionWrapper>
                    
                    <ColumnWrapper>
                        <Subtitle>Empleados promocionados</Subtitle>
                        <Separator />
                        {promotedEmployees.length ?
                            promotedEmployees.map((employee, index) => (
                                <Paragraph key={employee.id}>{employee.nombre}</Paragraph>
                            ))
                        : (
                            <Paragraph>Este mes no hubo empleados promocionados</Paragraph>
                        )}
                    </ColumnWrapper>

                    <ColumnWrapper>
                        <Subtitle>Empleados contratados</Subtitle>
                        <Separator />
                        {hiredEmployees.length ?
                            hiredEmployees.map((employee) => (
                                <Paragraph key={employee.id}>{employee.nombre}</Paragraph>
                            ))
                        : (
                            <Paragraph>Este mes no hubo empleados contratados</Paragraph>
                        )}
                    </ColumnWrapper>

                    <OrganizationChart data={filteredData} />
                </>
            )}
        </MainWrapper>
    )
}

export default DataPrevisualizer
