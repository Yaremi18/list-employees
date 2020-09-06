import styled from 'styled-components/macro'
import theme from '../../../providers/theme'

const Separator = styled.div`
    min-height: 1px;
    height: 1px;
    width: 100%;
    background: ${theme.colors.lightPrimary};
    margin-bottom: 5px;
    margin-top: 5px;
`

export default Separator