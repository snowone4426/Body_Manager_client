import styled from 'styled-components'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'

export default function SignUpFormList({
  inputFn = (e, key) => {},
  validationCheck = {},
  data = {
    profile: '',
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    gender: '',
    height: '',
    remark: '',
    birth: '',
  },
}) {
  const [imagePreview, setImagePreview] = useState('')
  const dataArr = Object.keys(data)

  const open = useDaumPostcodePopup()

  const handleComplete = (data) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    inputFn(fullAddress, 'address')
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
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

  const inputList = dataArr.map((el) => {
    switch (el) {
      case 'profile':
        return null
      case 'address':
        return (
          <SignUpFormInputFrame key={el}>
            <AddressModalBtn onClick={handleClick}>주소 찾기</AddressModalBtn>
            <AddressContent>{data.address}</AddressContent>
          </SignUpFormInputFrame>
        )
      case 'gender':
        return (
          <SignUpFormInputFrame key={el}>
            <GenderBtnBox>
              <GenderBtn
                value="M"
                onClick={(e) => inputFn(e, el)}
                isSelect={data[el] === 'M'}
              >
                남자
              </GenderBtn>
              <GenderBtn
                value="F"
                onClick={(e) => inputFn(e, el)}
                isSelect={data[el] === 'F'}
              >
                여자
              </GenderBtn>
            </GenderBtnBox>
          </SignUpFormInputFrame>
        )
      default:
        return (
          <SignUpFormInputFrame key={el}>
            <SignUpInputLabel validationCheck={validationCheck[el]}>
              <InputTitle>{el}</InputTitle>
              <SighUpInput
                type="text"
                onChange={(e) => inputFn(e, el)}
                value={data[el]}
              />
            </SignUpInputLabel>
          </SignUpFormInputFrame>
        )
    }
  })

  return (
    <SignUpFormListContainer>
      <ProfileLabel>
        {imagePreview ? (
          <PreviewImg src={imagePreview} alt="preview" />
        ) : (
          <FaUser size={45} />
        )}
        <SighUpInput
          isVisibility={true}
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            inputFn(e, 'profile')
            encodeFileToBase64(e.target.files[0])
          }}
        />
      </ProfileLabel>
      {inputList}
    </SignUpFormListContainer>
  )
}

const SignUpFormListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SignUpFormInputFrame = styled.li``

const SighUpInput = styled.input`
  display: ${({ isVisibility }) => (isVisibility ? 'none' : 'default')};
  font-size: 1.1rem;
  background-color: transparent;
`

const InputTitle = styled.h2`
  font-size: 0.8rem;
  opacity: 0.7;
`

const SignUpInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 18rem;
  height: 2.5rem;
  border: ${({ validationCheck }) => (validationCheck ? '1px solid red' : '')};
  border-radius: 0.4rem;
  font-size: 1.2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  margin: 0.2rem;
  padding: 1rem;
  background-color: #ebebeb;
  cursor: text;
  overflow: hidden;
`

const AddressContent = styled.div`
  width: 18rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  margin: 0.2rem;
  padding: 0.9rem 1rem;
  background-color: #ebebeb;
  overflow: hidden;
`

const AddressModalBtn = styled.button`
  width: 6rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  color: white;
  margin: 0.2rem;
  background-color: #808080;
`

const ProfileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border: 1px solid #d2d1d1;
  border-radius: 100%;
  margin: 0.5rem 0 1rem;
  overflow: hidden;
`

const PreviewImg = styled.img`
  width: auto;
  height: 5rem;
`

const GenderBtnBox = styled.div`
  display: flex;
`

const GenderBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.8rem;
  height: 2.5rem;
  border: ${({ validationCheck }) => (validationCheck ? '1px solid red' : '')};
  border-radius: 0.4rem;
  font-size: 1.2rem;
  margin: 0.2rem;
  padding: 1rem;
  background-color: #ebebeb;
  overflow: hidden;
  opacity: ${({ isSelect }) => (isSelect ? 1 : 0.5)};
`
