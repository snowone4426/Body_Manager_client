import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

export default function IconBtn({ onClickFn = () => {}, context, children }) {
  const location = useLocation()
  return (
    <IconBtnContainer
      onClick={onClickFn}
      isSelect={location.pathname.split('/')[1] === context.toLowerCase()}
    >
      {children}
    </IconBtnContainer>
  )
}

const IconBtnContainer = styled.button`
  display: flex;
  justify-content: center;
  width: 7rem;
  color: ${({ isSelect }) => (isSelect ? 'white' : 'gray')};
  border-left: ${({ isSelect }) => (isSelect ? '0.1rem solid white' : 'none')};
  margin: 1.5rem 0;
`
