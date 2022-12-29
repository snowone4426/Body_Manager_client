import styled from 'styled-components'

import { FaTimes } from 'react-icons/fa'

export default function SingleDiet({ info, deleteFn, onClickFn, type }) {
  const { photo, content, created_at, grade, id } = info

  return (
    <SingleDietContainer>
      {!!photo ? (
        <>
          <CloseBtn onClick={() => deleteFn(id)}>
            <FaTimes />
          </CloseBtn>
          <DietFrame type="fill" onClick={() => onClickFn(type)}>
            <PhotoFrame>
              {' '}
              <DietImg src={photo} alt="food" />
            </PhotoFrame>
            <InfoFrame>
              <Content>{content}</Content>
              <Time>{created_at}</Time>
              <ScoreColor grade={grade} />
            </InfoFrame>
          </DietFrame>
        </>
      ) : (
        <DietFrame type="empty" onClick={() => onClickFn(type)}>
          식단을 등록해 주세요
        </DietFrame>
      )}
    </SingleDietContainer>
  )
}

const SingleDietContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
  margin: 0.1rem;
  background-color: #d3d3d3;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
`

const DietFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ type }) =>
    type === 'empty' ? 'center' : 'space-between'};
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const PhotoFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 9rem;
  border-radius: 0.5rem;
  margin-top: 0.7rem;
  background-color: black;
  overflow: hidden;
`

const InfoFrame = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0.5rem;
  padding: 0 0.5rem 0 1rem;
`

const Content = styled.div`
  font-size: 1rem;
`

const Time = styled.div`
  font-size: 0.8rem;
  color: gray;
`

const ScoreColor = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 0.3rem;
  background-color: ${({ grade }) =>
    grade === 0 ? 'transparent' : grade === 1 ? 'yellow' : '#7df87d'};
`

const DietImg = styled.img`
  width: 12rem;
  height: auto;
`
