import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import { SinglePlan } from '..'

export default function ExercisePlan() {
  const [planArr, setPlanArr] = useState([])
  const mainPickDate = useSelector((state) => state.date.mainDate)

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/ptprogram/list`,
        {
          date: mainPickDate,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          setPlanArr(res.data.data)
        }
      })
      .catch((err) => console.log(err))
    // setPlanArr([
    //   {
    //     title: '제목1',
    //     weight: '20kg',
    //     count: '10',
    //   },
    //   {
    //     title: '제목2',
    //     weight: '20kg',
    //     count: '10',
    //   },
    // ])
  }, [mainPickDate])

  return (
    <ExercisePlanContainer>
      <Title>운동 목록 리스트</Title>
      <SinglePlan
        planData={{
          title: '이름',
          weight: '무게',
          count: '횟수',
        }}
      />
      <Bar />
      {planArr.map((el) => (
        <ExList key={`${el.title} ${el.weight} ${el.count}`}>
          <SinglePlan planData={el} />
        </ExList>
      ))}
    </ExercisePlanContainer>
  )
}

const ExercisePlanContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 3rem;
`

const ExList = styled.li``

const Bar = styled.div`
  width: 60%;
  border-bottom: 1px solid black;
`
