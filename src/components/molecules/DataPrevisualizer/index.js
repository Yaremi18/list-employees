import React, { useMemo, useCallback, useState } from 'react'
import { Title, Subtitle, Paragraph } from '../../atoms/Text'
import convertCSVtoObject from '../../../utils/convertCsvToObject'
import Table from '../../atoms/Table'
import Select from '../../atoms/Select'
import {
    MainWrapper,
    ColumnWrapper,
    DirectionWrapper,
    TableWrapper,
    InputFile,
} from './style'
import Separator from '../../atoms/Separator'
import OrganizationChart from '../OrganizationChart'
import convertExcelToObject from '../../../utils/convertExcelToObject'

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
        // This callback once the file is loaded update the
        // data & header hooks with the CSV information.
        const file = target?.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.addEventListener('load', (event) => {
            
            setFileLoaded(true)
            const _result = event.target.result

            if (file.name.endsWith('.csv')) {
                const { data: _data, headers: _headers } = convertCSVtoObject(_result)
                setOriginalData(_data)
                setHeaders(_headers)
            } else {
                const { data: _data, headers: _headers } = convertExcelToObject(event.target.result)

                setOriginalData(_data)
                setHeaders(_headers)
            }
        })

        if (file.name.endsWith('.csv')) {
            reader.readAsText(file)
        } else {
            reader.readAsBinaryString(file)
        }
    }, [])

    const updateMyData = useCallback((rowIndex, columnId, value) => {
        setOriginalData((prev =>
            prev.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              }
              return row
            })
          ))
    }, [])

    const columns = useMemo(() => {
        // Generate columns for previsualize the data loaded
        if (!originalData.length) return []

        const _headersData = Object.keys(originalData[0])

        return headers.map((header, index) => ({
            Header: header.toUpperCase(),
            accessor: _headersData[index],
        }))
    }, [originalData, headers])

    const filterData = useCallback((byMonth) => {
        // Filter data by month
        return originalData.filter((row) => {
            if (!row.mes) return false

            // Column "mes" has a string similar to '5-2020' where
            // the number before '-' is the month.
            const _month = row.mes.split('-')[0]
            return _month === byMonth
        })
    }, [originalData])

    const filteredData = useMemo(() => {
        // function that filter data by the month selected on the select
        return filterData(month)
    }, [filterData, month])

    const totalPayments = useMemo(() => (
        // Calculate the "sueldo bruto" total for the data showed
        filteredData.reduce((accum, row) => {
            if (!row.sueldobruto) return accum

            return accum + Number(row.sueldobruto)
        }, 0)
    ), [filteredData])

    const prevMonthData = useMemo(() => {
        // Give us the data of the previous month selected
        let prevMonth = (month - 1 === 0 ? 12 : month - 1).toString()
        return filterData(prevMonth)
    }, [month, filterData])

    const promotedEmployees = useMemo(() => {
        // Search the promoted employees using the 'prevMonthData'
        let _promotedEmployees = []
        prevMonthData.forEach((prevRow) => {
            filteredData.forEach((actualRow) => {
                const actualSalary = Number(actualRow.sueldobruto)
                const prevSalary = Number(prevRow.sueldobruto)
                // Calculing if the actual salary is over the previous salary
                // and ids must to be equal
                if (!(actualSalary > prevSalary && actualRow.id === prevRow.id)) return

                _promotedEmployees.push(actualRow)
            })
        })
        return _promotedEmployees
    }, [filteredData, prevMonthData])

    const hiredEmployees = useMemo(() => (
        // Calculate hired employees using the 'prevMonthData'
        filteredData.filter((actualRow) => (
            // Find the employee that doesn't exists in the previous month data
            !prevMonthData.find((prevRow) => prevRow.id === actualRow.id)
        ))
    ), [prevMonthData, filteredData])

    return (
        <MainWrapper>
            <Title>Empleados</Title>
            
            <InputFile
                type="file"
                id="file-selector"
                accept=".csv, .xlsx"
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
                    <TableWrapper>
                        <Table
                            data={filteredData}
                            columns={columns}
                            updateMyData={updateMyData}
                        />
                    </TableWrapper>
                    {!filteredData.length ? (
                        <DirectionWrapper direction="center">
                            <Paragraph>No hay datos para este mes</Paragraph>
                        </DirectionWrapper>
                    ) : (
                        <DirectionWrapper direction="center">
                            <Paragraph>**Para editar los datos haz clic sobre la celda a editar</Paragraph>
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

                    <br />
                    <OrganizationChart data={filteredData} />
                </>
            )}
        </MainWrapper>
    )
}

export default DataPrevisualizer
