import { useState } from 'react'
import styled from 'styled-components'

import { AccountToggle, Membership, PurchaseHistory } from '..'

export default function PaymentInfo() {
  const [togleSelect, setToggleSelect] = useState(0)
  const toggleArr = [<Membership />, <PurchaseHistory />]
  const toggleHandler = (name) => {
    setToggleSelect(name)
  }

  return (
    <PaymentInfoContainer>
      <AccountToggle togleSelect={togleSelect} toggleHandler={toggleHandler} />
      <PaymentInfoFrame>{toggleArr[togleSelect]}</PaymentInfoFrame>
    </PaymentInfoContainer>
  )
}

const PaymentInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PaymentInfoFrame = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  width: 58rem;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: #99aeb489;
`
