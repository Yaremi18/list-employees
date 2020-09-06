import styled, { css } from 'styled-components/macro'
import theme from '../../../providers/theme'

const backgroundColor = css`
    color: ${({ color }) => theme.colors[color || 'white']};
    
`

export const Title = styled.span`
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: bold;
    color: ${({ color }) => theme.colors[color || 'white']};
`

export const Subtitle = styled.span`
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${({ color }) => theme.colors[color || 'secondary']};
`

export const Paragraph = styled.span`
    font-size: 12px;
    color: ${({ color }) => theme.colors[color || 'white']};
`