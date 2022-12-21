import styled from 'styled-components'

export default function SingleDiet({ info }) {
  const { photo, content, created_at, grade } = info

  return (
    <SingleDietContainer>
      <PhotoFrame>
        <DietImg src={photo} alt="food" />
      </PhotoFrame>
      <InfoFrame>
        <Content>{content}</Content>
        <Time>{created_at}</Time>
      </InfoFrame>
      {/* <ScoreColor>{grade}</ScoreColor> */}
    </SingleDietContainer>
  )
}

const SingleDietContainer = styled.div`
  display: flex;
  background-color : #d3d3d3;
  border-radius : 1rem;
  padding : 1rem;
  height: 15rem;
  margin: 0.1rem;
`

const PhotoFrame = styled.div``

const InfoFrame = styled.div`
display:flex;
flex-direction : column;
justify-content: space-between;
margin: 0.5rem;
`

const Content = styled.div`
font-size : 1rem`

const Time = styled.div`
  font-size: 0.8rem;
  color: gray;
`

const ScoreColor = styled.div``

const DietImg = styled.img`
width: 12rem;
border-radius : 0.5rem;
background-color: black;
`
