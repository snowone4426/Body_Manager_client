import styled from 'styled-components'

import { ToggleBtn } from '..'

export default function AccountToggle({
  toggleHandler = () => {},
  togleSelect,
}) {
  return (
    <AccountToggleContainer>
      <ToggleBtn
        isSelect={togleSelect === 0}
        onClickFn={() => toggleHandler(0)}
      >
        Membership
      </ToggleBtn>
      <ToggleBtn
        isSelect={togleSelect === 1}
        onClickFn={() => toggleHandler(1)}
      >
        History
      </ToggleBtn>
    </AccountToggleContainer>
  )
}

const AccountToggleContainer = styled.ul`
  display: flex;
  align-self: flex-start;
`
