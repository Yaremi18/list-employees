import styled from 'styled-components/macro'
import device from '../../../utils/screenSizes'

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;

    media ${device.mobileS} {
        align-items: flex-start;
    }
    @media ${device.laptop} { 
        align-items: center;
    }

    @media ${device.desktop} {
        align-items: center;
    }
`