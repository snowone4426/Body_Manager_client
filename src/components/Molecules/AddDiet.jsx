import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

export default function AddDiet({ time, dietData, onClickFn = () => {} }) {
  const [dietInfo, setDietInfo] = useState({
    time: time,
    content: dietData.content ?? '',
    food_img: dietData.food_img ?? '',
  })
  const inputHanlder = (e, key) => {
    switch (key) {
      case 'profile':
        setDietInfo({ ...dietInfo, [key]: e.target.files[0] })
        return
      default:
        setDietInfo({ ...dietInfo, [key]: e.target.value })
    }
  }

  const submitHanlder = () => {
    const isEmpty = !Object.keys(dietData).length
    const formData = new FormData()

    Object.keys(dietInfo).forEach((el) => formData.append(el, dietInfo[el]))

    if (isEmpty) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/food/register`, formData)
        .then((res) => {
          if (res.data.message === 'ok') {
            alert('등록되었습니다')
            onClickFn()
          }
        })
        .catch((err) => {
          alert('등록에 실패하였습니다')
          console.log(err)
        })
      return
    }

    formData.append('food_id', dietData.food_id)

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/food/modify`, formData)
      .then((res) => {
        if (res.data.message === 'ok') {
          alert('등록되었습니다')
          onClickFn()
        }
      })
      .catch((err) => {
        alert('등록에 실패하였습니다')
        console.log(err)
      })
  }

  return (
    <AddDietContainer>
      <ul>
        <li>
          <label>
            food_img
            <input type="file" onChange={(e) => inputHanlder(e, 'food_img')} />
          </label>
        </li>
        <li>
          <label>
            content
            <input
              type="text"
              onChange={(e) => inputHanlder(e, 'content')}
              value={dietInfo.content}
            />
          </label>
        </li>
      </ul>
      <button onClick={submitHanlder}>등록</button>
    </AddDietContainer>
  )
}

const AddDietContainer = styled.div``
