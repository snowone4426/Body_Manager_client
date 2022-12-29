import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

import { FaTimes, FaImage } from 'react-icons/fa'

export default function AddDiet({ time, dietData, onClickFn = () => {} }) {
  const [imagePreview, setImagePreview] = useState('')

  const [dietInfo, setDietInfo] = useState({
    time: time,
    content: dietData.content ?? '',
    food_img: dietData.food_img ?? '',
  })
  const inputHanlder = (e, key) => {
    ;<CloseBtn></CloseBtn>
    switch (key) {
      case 'food_img':
        setDietInfo({ ...dietInfo, [key]: e.target.files[0] })
        return
      default:
        setDietInfo({ ...dietInfo, [key]: e.target.value })
    }
  }

  const submitHanlder = () => {
    const isEmpty = !Object.keys(dietData).length
    const formData = new FormData()

    Object.keys(dietInfo).forEach((el) => {
      console.log(dietInfo[el])
      formData.append(el, dietInfo[el])
    })

    if (isEmpty) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/food/register`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === 'ok') {
            alert('등록되었습니다')
            onClickFn()
          }
          onClickFn()
        })
        .catch((err) => {
          alert('등록에 실패하였습니다')
          console.log(err)
        })
      return
    }

    formData.append('food_id', dietData.id)

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/food/modify`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          alert('등록되었습니다')
        }
        onClickFn()
      })
      .catch((err) => {
        alert('등록에 실패하였습니다')
        console.log(err)
      })
  }

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise((resolve) => {
      reader.onload = () => {
        setImagePreview(reader.result)
        resolve()
      }
    })
  }

  function check_reset(tipword) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(tipword)) return console.log(true)
    else return console.log(false)
  }

  return (
    <AddDietContainer>
      <CloseBtn onClick={() => onClickFn()}>
        <FaTimes />
      </CloseBtn>
      <ProfileLabel>
        {imagePreview ? (
          <PreviewImg src={imagePreview} alt="preview" />
        ) : (
          <FaImage size={100} />
        )}
        <SighUpInput
          isVisibility={true}
          type="file"
          onChange={(e) => {
            inputHanlder(e, 'food_img')
            encodeFileToBase64(e.target.files[0])
          }}
        />
      </ProfileLabel>
      <ContentInput
        type="text"
        onChange={(e) => inputHanlder(e, 'content')}
        value={dietInfo.content}
        placeholder="음식 내용을 작성해 주세요."
      />
      <SubmitBtn onClick={submitHanlder}>등록</SubmitBtn>
    </AddDietContainer>
  )
}

const AddDietContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24rem;
  padding: 1rem;
`

const CloseBtn = styled.button`
  align-self: flex-end;
`

const ProfileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 13rem;
  border: 1px solid #d2d1d1;
  border-radius: 1rem;
  margin: 0.5rem 0 1rem;
  overflow: hidden;
`

const PreviewImg = styled.img`
  width: auto;
  height: 13rem;
`

const SighUpInput = styled.input`
  display: ${({ isVisibility }) => (isVisibility ? 'none' : 'default')};
  font-size: 1.1rem;
  background-color: transparent;
`

const ContentInput = styled.textarea`
  width: 90%;
  height: 4rem;
  border-radius: 0.3rem;
  padding: 0.3rem;
  resize: none;
  outline: none;
`

const SubmitBtn = styled.button`
  font-size: 1.1rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  padding: 0.3rem 0.7rem;
  background-color: #e9e9e9;
`
