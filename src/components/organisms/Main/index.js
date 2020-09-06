import React, { useMemo, useCallback, useState } from 'react'
import { Title, Subtitle } from '../../atoms/Text'
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

function Main() {
  const [headers, setHeaders] = useState([])
  const [originalData, setOriginalData] = useState([])

  const [month, setMonth] = useState(actualMonth)
  const loadFile = useCallback((data) => {
    if (!data.target?.files?.[0]) return
    const file = data.target.files[0]
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result
      setOriginalData(convertCSVtoObject(result))
    })
    reader.readAsText(file)
  }, [])

  const columns = useMemo(() => {
    if (!originalData.length) return []

    const _headers = Object.keys(originalData[0])
    setHeaders(_headers)
    return _headers.map((header) => ({
      Header: header.toUpperCase(),
      accessor: header,
    }))
  }, [originalData])

  const filteredData = useMemo(() => {
    if (!headers.includes('Mes')) return originalData

    return originalData.filter((row) => {
      const _month = row.Mes.split('-')[0]
      return _month === month
    })
  }, [headers, originalData, month])

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
    </MainWrapper>
  )
}

export default Main
