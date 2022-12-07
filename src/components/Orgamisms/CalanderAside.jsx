import styled from 'styled-components'

import { MainCalander } from '..'

export default function CalanderAside() {
  return (
    <CalanderAsideContainer>
      <MainCalander />
      <Illustration
        src={`${process.env.PUBLIC_URL}/assets/ride_female.png`}
        alt="exercise"
      />
    </CalanderAsideContainer>
  )
}

const CalanderAsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
`
const Illustration = styled.img`
  width: 60%;
  opacity: 0.5;
`
