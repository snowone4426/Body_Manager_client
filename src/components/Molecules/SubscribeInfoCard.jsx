import styled from 'styled-components'

export default function SubscribeInfoCard({ title, data, color }) {
  return (
    <SubscribeInfoCardContainer color={color}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{data}</CardContent>
      <BackImg src={`${process.env.PUBLIC_URL}/assets/babel.png`} alt="babel" />
    </SubscribeInfoCardContainer>
  )
}

const SubscribeInfoCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 17rem;
  height: 7rem;
  border-radius: 1rem;
  color: white;
  padding: 1rem;
  margin: 0 1rem;
  background-color: ${({ color }) => color};
`

const BackImg = styled.img`
  position: absolute;
  right: -2rem;
  top: 2rem;
  width: 13rem;
  height: auto;
  transform: rotate(-20deg);
  pointer-events: none;
`

const CardTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`

const CardContent = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`
