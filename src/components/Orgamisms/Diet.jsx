import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { SingleDiet, ModalContainer, AddDiet } from '..'
import axios from 'axios'
import moment from 'moment/moment'

export default function Diet() {
  const [dietData, setDietData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const mainPickDate = useSelector((state) => state.date.mainDate)

  useEffect(() => {
    axios
      .post(
        `http://localhost:8081/food/list`,
        {
          date: mainPickDate,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          setDietData(res.data.data)
        }
      })
      .catch((err) => console.log(err))

    // setDietData({
    //   breakfast: {
    //     id: 1,
    //     photo: 'S3 경로',
    //     content: '사과 3개',
    //     created_at: '08:34 AM',
    //     grade: 2,
    //   },
    //   lunch: {
    //     id: 2,
    //     photo: 'S3 경로',
    //     content: '삼겹살 5인분',
    //     created_at: '12:09 PM',
    //     grade: 1,
    //   },
    //   dinner: {},
    // })
  }, [mainPickDate])

  const modalOpenHandler = (time) => {
    if (
      mainPickDate !== moment(new Date()).format('YYYY-MM-DD') ||
      time === undefined
    ) {
      setIsOpen('')
      return
    }

    setIsOpen(time)
  }
  return (
    <DietContainer>
      <div>{mainPickDate}</div>
      <DietList>
        {Object.keys(dietData).map((el) => (
          <li onClick={() => modalOpenHandler(el)} key={el}>
            <SingleDiet info={dietData[el]} />
          </li>
        ))}
      </DietList>
      {mainPickDate === moment(new Date()).format('YYYY-MM-DD') && isOpen && (
        <ModalContainer onClickFn={modalOpenHandler}>
          <AddDiet
            time={isOpen}
            dietData={dietData[isOpen]}
            onClickFn={modalOpenHandler}
          />
        </ModalContainer>
      )}
    </DietContainer>
  )
}

const DietContainer = styled.div``

const DietList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`
