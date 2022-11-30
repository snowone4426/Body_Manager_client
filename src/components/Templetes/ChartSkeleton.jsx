import styled from 'styled-components'

import { MuscleFatChart, InbodyEtcData } from '..'

export default function ChartSkeleton() {
  return (
    <ChartSkeletonContainer>
      <MuscleFatChart />
      <InbodyEtcData />
    </ChartSkeletonContainer>
  )
}

const ChartSkeletonContainer = styled.div``
