import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../../store/auth'
import { ModalContainer, IdSearch, PasswordSearch } from '..'

export default function LoginForm() {
  const publicUrl = process.env.PUBLIC_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAOKEY}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakaologin`

  const [isModalOpen, setIsModalOpen] = useState('')
  const [loginInputData, setLoginInputData] = useState({ id: '', password: '' })

  const loginHanlder = () => {
    // eslint-disable-next-line no-useless-escape
    // const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
    // if (!exptext.test(loginInputData.id)) {
    //   alert('이메일 형식이 올바르지 않습니다.')
    //   return
    // }
    // if (!loginInputData.password) {
    //   alert('비밀번호를 입력해 주세요')
    //   return
    // }
    // axios
    //   .post(
    //     `${process.env.REACT_APP_SERVER_URL}/initial/login`,
    //     { email: loginInputData.id, password: loginInputData.password },
    //     { withCredentials: true },
    //   )
    //   .then((res) => {
    //     if (res.data.message === 'ok') {
    //       dispatch(authActions.login(res.data.data))
    //       navigate('/management', { replace: true })
    //     } else {
    //       alert('로그인에 실패하였습니다. 다시 시도해 주세요')
    //       setLoginInputData({ id: '', password: '' })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     alert('로그인에 실패하였습니다. 다시 시도해 주세요')
    //     setLoginInputData({ id: '', password: '' })
    //   })
    dispatch(authActions.login(loginInputData))
    navigate('/management', { replace: true })
  }

  const onChangeHanlder = (e, key) => {
    setLoginInputData({ ...loginInputData, [key]: e.target.value })
  }

  const pressEnterHanlder = (e) => {
    if (e.key === 'Enter') {
      loginHanlder()
    }
  }

  const modalOpener = (name) => {
    if (name === undefined) {
      setIsModalOpen('')
      return
    }
    setIsModalOpen(name)
  }

  return (
    <LoginFormContainer>
      <LoginFormFrame>
        <LoginTitle>
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" />
          Body Manager
        </LoginTitle>
        <LoginInput
          onChange={(e) => onChangeHanlder(e, 'id')}
          onKeyDown={pressEnterHanlder}
          value={loginInputData.id}
          placeholder="ID"
        />
        <LoginInput
          onChange={(e) => onChangeHanlder(e, 'password')}
          onKeyDown={pressEnterHanlder}
          value={loginInputData.password}
          placeholder="PASSWORD"
        />
        <BtnBox>
          <LoginSearchBtn onClick={() => modalOpener('id')}>
            아이디 찾기
          </LoginSearchBtn>
          <LoginSearchBtn onClick={() => modalOpener('password')}>
            비밀번호 찾기
          </LoginSearchBtn>
          <LoginSearchBtn onClick={() => navigate('/signup')}>
            회원가입
          </LoginSearchBtn>
        </BtnBox>
        {isModalOpen && (
          <ModalContainer onClickFn={modalOpener}>
            {isModalOpen === 'id' ? (
              <IdSearch modalOpener={modalOpener} />
            ) : (
              <PasswordSearch modalOpener={modalOpener} />
            )}
          </ModalContainer>
        )}
        <LoginBtnBox>
          <AuthLink href={kakaoLink}>
            <AuthButtonImg
              src={`${publicUrl}/assets/kakao_login_medium_narrow.png`}
              alt="카카오 소셜 로그인"
            />
          </AuthLink>
          <LoginBtn
            isFill={!!loginInputData.id && !!loginInputData.password}
            onClick={loginHanlder}
          >
            LOGIN
          </LoginBtn>
        </LoginBtnBox>
      </LoginFormFrame>
    </LoginFormContainer>
  )
}

const LoginFormContainer = styled.section`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: white;
  margin: 7rem;
  padding: 1.5rem 2rem;
`

const LoginFormFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
`

const LoginTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  margin: 0.5rem 0;

  & > img {
    position: relative;
    bottom: 0.4rem;
    width: 3rem;
    margin-right: 0.3rem;
  }
`

const LoginInput = styled.input`
  width: 18rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  margin: 0.2rem;
  padding: 1rem;
  background-color: #ebebeb;
`

const LoginBtn = styled.button`
  position: relative;
  bottom: 0.1rem;
  width: 11rem;
  height: 2.8rem;
  font-weight: 600;
  border-radius: 0.4rem;
  margin-left: 0.3rem;
  background-color: #cecece;
  opacity: ${({ isFill }) => (isFill ? 1 : 0.7)};
`

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 18rem;
  padding: 0 0.3rem;
  margin-bottom: 1rem;
`

const LoginSearchBtn = styled.button`
  color: gray;
  margin: 0 0.2rem;
`

const AuthLink = styled.a``

const AuthButtonImg = styled.img``

const LoginBtnBox = styled.div`
  display: flex;
  align-items: center;
`
