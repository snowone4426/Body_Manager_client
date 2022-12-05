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

const AccountSkeletonContainer = styled.main``
