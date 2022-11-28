import styled from 'styled-components'

import { ProfileBox, BtnList, ChatBox } from '..'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Nav() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth)

  const navButtonClickHandler = (param) => {
    navigate(`/${param}`)
  }

  const btnListDataArr = [
    {
      icon: <FaSearch className="icon" size="24" />,
      context: 'Management',
      onClickFn: () => navButtonClickHandler('management'),
    },
    {
      icon: <FaSearch className="icon" size="24" />,
      context: 'Chart',
      onClickFn: () => navButtonClickHandler('chart'),
    },
    {
      icon: <FaSearch className="icon" size="24" />,
      context: 'Account',
      onClickFn: () => navButtonClickHandler('account'),
    },
  ]

  if (userInfo.type === 'trainer' || userInfo.type === 'admin') {
    btnListDataArr.push({
      icon: <FaSearch className="icon" size="24" />,
      context: 'Account',
      onClickFn: () => navButtonClickHandler('account'),
    })
  }

  return (
    <NavContainer>
      <BtnFrame>
        <Logo onClick={() => navButtonClickHandler('management')} />
        <ChatBox />
        <BtnList btnListDataArr={btnListDataArr} />
      </BtnFrame>
      <ProfileBox userInfo={userInfo} />
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  display: inherit;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 13rem;
  padding: 1rem;
  /* background-color: yellow; */
`

const Logo = styled.div`
  width: 10rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: black;
  cursor: pointer;
`

const BtnFrame = styled.div``
