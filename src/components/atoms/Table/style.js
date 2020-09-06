import styled from 'styled-components/macro'
import theme from '../../../providers/theme'

export const TableWrapper = styled.table`
    
`

export const THead = styled.thead`
    background: ${theme.colors.lightSecondary};
    > tr {
        font-size: 12px;
        color: ${theme.colors.secondary};
        height: 35px;
        font-weight: bold;
        > th {
            min-width: 100px;
        }
    }
`

export const TBody = styled.tbody`
    padding: 10px;
    > tr {
        font-size: 11px;
        color: ${theme.colors.white};
        height: 30px;
        > td {
            border-bottom: 1px solid ${theme.colors.lightSecondary};
        }
    }
`