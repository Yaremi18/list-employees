import styled, { css } from 'styled-components/macro'
import device from '../../../utils/screenSizes'
import theme from '../../../providers/theme'

export const sizes = {
    title: {
        mobile: '27px',
        web: '30px',
    },
    subtitle: {
        mobile: '12px',
        web: '15px',
    },
    paragraph: {
        mobile: '10px',
        web: '12px',
    },
}

const responsive = (type) => css`
    @media ${device.mobileS} {
        font-size: ${sizes[type].mobile};
    }
    @media ${device.laptop} { 
        font-size: ${sizes[type].web};
    }

    @media ${device.desktop} {
        font-size: ${sizes[type].web};
    }
`

export const Title = styled.span`
    margin-bottom: 20px;
    font-weight: bold;
    color: ${({ color }) => theme.colors[color || 'white']};
    ${responsive('title')}
`

export const Subtitle = styled.span`
    margin-bottom: 10px;
    font-weight: bold;
    color: ${({ color }) => theme.colors[color || 'secondary']};
    ${responsive('subtitle')}
`

export const Paragraph = styled.span`
    color: ${({ color }) => theme.colors[color || 'white']};
    ${responsive('paragraph')}
`