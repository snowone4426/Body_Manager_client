import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment/moment'

import { SingleDiet, ModalContainer, AddDiet } from '..'

export default function Diet() {
  const [dietData, setDietData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const mainPickDate = useSelector((state) => state.date.mainDate)

  const listHanlder = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/food/list`,
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
  }

  useEffect(() => {
    // listHanlder()
    setDietData({
      breakfast: {
        id: 1,
        photo: 'S3 경로',
        content: '사과 3개',
        created_at: '08:34 AM',
        grade: 0,
      },
      lunch: {
        id: 2,
        photo: 'S3 경로',
        content: '삼겹살 5인분',
        created_at: '12:09 PM',
        grade: 1,
      },
      dinner: {},
    })
  }, [mainPickDate])

  const deleteDietHanlder = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/food/delete`,
        {
          food_id: id,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          alert('삭제되었습니다')
          listHanlder()
        } else {
          alert('다시 시도해 주세요')
        }
      })
      .catch((err) => {
        console.log(err)
        alert('다시 시도해 주세요')
      })
  }

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
      <Title>식단표</Title>
      <DietList>
        {Object.keys(dietData).map((el) => (
          <li key={el}>
            <SingleDiet
              type={el}
              info={dietData[el]}
              deleteFn={deleteDietHanlder}
              onClickFn={modalOpenHandler}
            />
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
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 2rem 0;
`
