import styled from 'styled-components'

export default function SubscribeInfoCard({ title, data }) {
  return (
    <SubscribeInfoCardContainer>
      <div>{title}</div>
      <div>{data}</div>
    </SubscribeInfoCardContainer>
  )
}

const SubscribeInfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 8rem;
  border-radius: 2rem;
  border: 1px solid black;
`
