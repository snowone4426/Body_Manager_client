import styled from 'styled-components'

export default function AttendanceBtn({ children, onClickFn }) {
  return (
    <AttendanceBtnContainer onClick={onClickFn}>
      {children}
    </AttendanceBtnContainer>
  )
}

const AttendanceBtnContainer = styled.button`
  width: 6rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  color: white;
  margin-bottom: 1rem;
  background-color: #aeaeae;
`
