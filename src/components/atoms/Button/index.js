import styled from 'styled-components/macro'

const Button = styled.button`
    outline: none;
    border-radius: 5px;
    background-color: white;
    border: solid 1px black;
    width: 100px;
    cursor: pointer;
    height: 25px;
    font-size: 12px;
    :hover {
        background: gray;
    }
`

export default Button