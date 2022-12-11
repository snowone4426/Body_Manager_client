import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaUser,
  FaCommentDots,
  FaHeartbeat,
  FaIdCard,
  FaMoneyCheck,
} from 'react-icons/fa'

import { ProfileBox, BtnList, ChatModal, ModalContainer } from '..'
import { authActions } from '../../store/auth'
import axios from 'axios'

export default function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth)
  const [chatOpen, setChatOpen] = useState(false)

  const navButtonClickHandler = (param) => {
    navigate(`/${param}`)
  }

  const LogoutHanlder = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/initial/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          navigate(`/`, { replace: true })
          dispatch(authActions.logout())
        }
        alert('다시 시도해 주세요')
      })
      .catch((err) => {
        console.log(err)
        alert('다시 시도해 주세요')
      })
  }

  const btnListDataArr = [
    {
      icon: <FaUser className="icon" size="50" />,
      context: 'management',
      onClickFn: () => navButtonClickHandler('management'),
    },
    {
      icon: <FaHeartbeat className="icon" size="50" />,
      context: 'chart',
      onClickFn: () => navButtonClickHandler('chart'),
    },
    {
      icon: <FaMoneyCheck className="icon" size="50" />,
      context: 'account',
      onClickFn: () => navButtonClickHandler('account'),
    },
  ]

  if (userInfo.type === 'trainer' || userInfo.type === 'admin') {
    btnListDataArr.push({
      icon: <FaIdCard className="icon" size="50" />,
      context: 'Member',
      onClickFn: () => navButtonClickHandler('member'),
    })
  }

  const ChatModalOpenHandler = () => {
    setChatOpen(!chatOpen)
  }

  return (
    <NavContainer>
      <NavFrame>
        <BtnFrame>
          <Logo onClick={() => navButtonClickHandler('management')}>
            <LogoImg
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt="logo"
            />
          </Logo>
          {chatOpen && (
            <ModalContainer onClickFn={ChatModalOpenHandler}>
              <ChatModal onClickFn={ChatModalOpenHandler} />
            </ModalContainer>
          )}
          <BtnList btnListDataArr={btnListDataArr} />
        </BtnFrame>
        <ProfileBox userInfo={userInfo} />
      </NavFrame>
      <TopBtnBox>
        <TopBtn onClick={ChatModalOpenHandler}>
          <FaCommentDots className="icon" size="20" />
        </TopBtn>
        <TopBtn onClick={LogoutHanlder} type="login">
          로그아웃
        </TopBtn>
      </TopBtnBox>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  width: 7rem;
  border: 1px solid black;
  flex-shrink: 0;
  background-color: black;
`

const NavFrame = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 7rem;
  height: 100vh;
  padding: 1rem 0;
`

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 1.5rem;
  margin-bottom: 3rem;
  background-color: white;
  cursor: pointer;
`

const LogoImg = styled.img`
  width: 4.5rem;
`

const BtnFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopBtnBox = styled.div`
  position: fixed;
  right: 1.5rem;
  top: 1.5rem;
  display: flex;
  color: gray;
`

const TopBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ type }) => (type === 'login' ? '4.5rem' : '2.2rem')};
  height: 2.2rem;
  font-weight: 600;
  color: #535353;
  border-radius: 1.1rem;
  margin-left: 0.5rem;
  background-color: #eaeaea;
`
