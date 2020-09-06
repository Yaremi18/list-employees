import convertCsvToObject from './convertCsvToObject'

describe('Convert csv to object', () => {
    test('It should return formatted data & headers', () => {
        const csv = 'Mes,Nombre,ID,Fecha de ingreso,Sueldo bruto,División,Area,Subarea,ID Lider,Nivel Jerárquico\n5-2020,Juan Pérez,2345234523,01/04/2019,1200000,Ventas,Marketing,Digital,324532,Manager,\n5-2020,Rodrigo Soto,7345734643,01/10/2019,900000,Ventas,Marketing,Editorial,2345234523,Supervisor'
        expect(convertCsvToObject(csv)).toEqual({
            headers: ["Mes", "Nombre", "ID", "Fecha de ingreso", "Sueldo bruto", "División", "Area", "Subarea", "ID Lider", "Nivel Jerárquico"],
            data: [{
                area: "Marketing",
                división: "Ventas",
                fechadeingreso: "01/04/2019",
                id: "2345234523",
                idlider: "324532",
                mes: "5-2020",
                niveljerárquico: "Manager",
                nombre: "Juan Pérez",
                subarea: "Digital",
                sueldobruto: "1200000"
            }, {
                area: "Marketing",
                división: "Ventas",
                fechadeingreso: "01/10/2019",
                id: "7345734643",
                idlider: "2345234523",
                mes: "5-2020",
                niveljerárquico: "Supervisor",
                nombre: "Rodrigo Soto",
                subarea: "Editorial",
                sueldobruto: "900000"
            }]
        })    
    })
})