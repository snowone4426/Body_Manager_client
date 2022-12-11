import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

export default function IdSearch({ modalOpener = () => {} }) {
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' })
  const [SearchEmail, setSearchEmail] = useState('')

  const onChangeHanlder = (e, key) => {
    setUserInfo({ ...userInfo, [key]: e.target.value })
  }

  const pressEnterHanlder = (e) => {
    if (e.key === 'Enter') {
      submitHanlder()
    }
  }

  const submitHanlder = () => {
    if (!userInfo.name || !userInfo.phone) {
      alert('이름과 전화번호를 모두 입력해 주세요')
      return
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/findEmail`, {
        name: userInfo.name,
        phone: userInfo.phone.split('-').join(''),
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          setSearchEmail(res.data.data.email)
          return
        }
        alert('가입되어있지 않은 정보 입니다.')
        setUserInfo({ name: '', phone: '' })
      })
      .catch((err) => {
        console.log(err)
        alert('검색에 실패하였습니다. 다시 시도해주세요')
        setUserInfo({ name: '', phone: '' })
      })
  }

  const preSearch = (
    <>
      <InputBox>
        <InputFrame>
          <CustomInput
            onChange={(e) => onChangeHanlder(e, 'name')}
            onKeyDown={pressEnterHanlder}
            type="text"
            value={userInfo.name}
            placeholder="이름"
          />
        </InputFrame>
        <InputFrame>
          <CustomInput
            onChange={(e) => onChangeHanlder(e, 'phone')}
            onKeyDown={pressEnterHanlder}
            type="text"
            value={userInfo.phone}
            placeholder="전화번호"
          />
        </InputFrame>
      </InputBox>
      <SubmitBtn
        isFill={!!userInfo.name && !!userInfo.phone}
        onClick={submitHanlder}
      >
        찾기
      </SubmitBtn>
    </>
  )

  const afterSearch = <div>{SearchEmail}</div>

  return (
    <IdSearchContainer>
      <CloseBtn onClick={() => modalOpener('')}></CloseBtn>
      <SearchTitle>아이디 찾기</SearchTitle>
      {SearchEmail ? afterSearch : preSearch}
    </IdSearchContainer>
  )
}

const IdSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;
`

const SearchTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const CustomInput = styled.input`
  width: 18rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  margin: 0.2rem;
  padding: 1rem;
  background-color: #ebebeb;
`

const SubmitBtn = styled.button`
  width: 18rem;
  height: 2.5rem;
  font-weight: 600;
  border-radius: 0.4rem;
  margin-top: 1rem;
  background-color: #cecece;
  opacity: ${({ isFill }) => (isFill ? 1 : 0.5)};
`

const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.7rem;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  background-color: #ff5f57;
`

const InputBox = styled.ul``
const InputFrame = styled.li``
