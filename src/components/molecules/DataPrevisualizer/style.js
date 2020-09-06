import styled from 'styled-components/macro'
import theme from '../../../providers/theme'
import device from '../../../utils/screenSizes'

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const InputFile = styled.input`
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
    font-size: 12px;
    color: ${theme.colors.secondary};
`

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    media ${device.mobileS} {
        width: 100%;
    }
    @media ${device.laptop} { 
        width: 50%;
    }
`

export const DirectionWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${({ direction }) => direction};
`

export const TableWrapper = styled.div`
    overflow: auto;
`