import React from 'react'
import { Title } from '../../atoms/Text'
import Button from '../../atoms/Button'
import {
  MainWrapper,
  Input,
} from './style'

function Main() {
  return (
    <MainWrapper>
      <Title>Empleados</Title>

      <Button>Load file</Button>
      <Input
        type="file"
        id="file-selector"
        accept=".csv"
      />
    </MainWrapper>
  )
}

export default Main
