export default (dataCsv) => {
    const rows = dataCsv.split('\n')
    const headers = rows[0].split(',')

    const data = rows.reduce((accumData, row, index) => {
        if (index === 0) return accumData

        const actualRow = row.split(',')
        const rowObject = headers.reduce((accumRow, header, index) => ({
            ...accumRow,
            [header]: actualRow[index],
        }), {})

        return [
            ...accumData,
            rowObject,
        ]
    }, [])

    return data
}