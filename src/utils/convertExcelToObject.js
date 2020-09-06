import XLSX from 'xlsx'

const convertToObject = (workbook) => {
    let result = []
    const sheet = workbook.SheetNames[0]
    const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
        raw: false,
    })
    if (roa.length) result = roa

    return result
  }

const convertExcelToObject = (data) => {
    var workbook = XLSX.read(data, {
      type: 'binary'
    })
    const _formatedData = convertToObject(workbook)
    const headers = []

    let newData = []
    _formatedData.forEach((row) => {
        newData = [
            ...newData,
            Object.entries(row).reduce((accum, [header, value]) => {
                if (headers.indexOf(header) < 0) {
                    headers.push(header)
                }
                const newHeader = header.replace(/\s/g, '').toLowerCase()
                return {
                    ...accum,
                    [newHeader]: value,
                }
            }, {})
        ]
    })
    return {
        data: newData,
        headers,
    }
}

export default convertExcelToObject