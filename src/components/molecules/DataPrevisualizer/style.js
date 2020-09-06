import styled from 'styled-components/macro'

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const Input = styled.input`
    ::-webkit-file-upload-button {
        border-radius: 5px;
        height: 25px;
        background: white;
        border: 1px solid black;
        outline: none;
        cursor: pointer;
        :hover {
            background: gray;
        }
    }
    font-size: 12px;
`