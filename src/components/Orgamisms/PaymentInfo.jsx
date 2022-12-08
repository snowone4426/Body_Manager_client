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
      {togleSelect}
      <AccountToggle toggleHandler={toggleHandler} />
      {toggleArr[togleSelect]}
    </PaymentInfoContainer>
  )
}

const PaymentInfoContainer = styled.section``
