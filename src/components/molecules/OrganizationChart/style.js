import styled from 'styled-components'
import theme from '../../../providers/theme'

export const Node = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-flex;
    border: 1px solid ${theme.colors.secondary};
    color: ${theme.colors.white};
    flex-direction: column;
`