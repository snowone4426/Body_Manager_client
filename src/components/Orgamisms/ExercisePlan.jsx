import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment/moment'
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
      <div>{mainPickDate}</div>
      {planArr.map((el) => (
        <li key={`${el.title} ${el.weight} ${el.count}`}>
          <SinglePlan planData={el} />
        </li>
      ))}
    </ExercisePlanContainer>
  )
}

const ExercisePlanContainer = styled.ul``
