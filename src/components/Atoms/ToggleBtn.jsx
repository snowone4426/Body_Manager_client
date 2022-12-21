import styled from 'styled-components'

export default function ToggleBtn({ onClickFn, children, isSelect }) {
  return (
    <ToggleButton isSelect={isSelect} onClick={onClickFn}>
      {children}
    </ToggleButton>
  )
}

const ToggleButton = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ isSelect }) => (isSelect ? '#0c1435' : 'gray')};
  margin: 0.3rem;
`
