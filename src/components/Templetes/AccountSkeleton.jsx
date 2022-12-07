import styled from 'styled-components'

import { SubscribeInfo, PaymentInfo } from '..'

export default function AccountSkeleton() {
  return (
    <AccountSkeletonContainer>
      <SubscribeInfo />
      <PaymentInfo />
    </AccountSkeletonContainer>
  )
}

const AccountSkeletonContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`
