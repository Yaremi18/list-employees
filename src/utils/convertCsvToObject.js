export default (dataCsv) => {
    const rows = dataCsv.split('\n')
    const headers = rows[0].split(',')

    const data = rows.reduce((accumData, row, index) => {
        if (index === 0) return accumData

        const actualRow = row.split(',')
        const rowObject = headers.reduce((accumRow, header, index) => {
            const newHeader = header.replace(/\s/g, '').toLowerCase()
            return {
                ...accumRow,
                [newHeader]: actualRow[index],
            }
        }, {})

        return [...accumData, rowObject]
    }, [])

    return { headers, data }
}