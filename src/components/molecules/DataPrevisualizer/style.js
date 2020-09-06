import styled from 'styled-components/macro'
import theme from '../../../providers/theme'

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1000px;
`

export const Input = styled.input`
    ::-webkit-file-upload-button {
        border-radius: 5px;
        height: 25px;
        background: white;
        border: 2px solid ${theme.colors.primary};
        outline: none;
        cursor: pointer;
        color: ${theme.colors.black};
        :hover {
            background: ${theme.colors.lightGray};
        }
        width: 150px;
    }
    outline: none;
    width: 400px;
    font-size: 12px;
    color: ${theme.colors.secondary};
`

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

export const ColumnWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

export const DirectionWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${({ direction }) => direction};
`