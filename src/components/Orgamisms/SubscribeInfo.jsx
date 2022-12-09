import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { SubscribeInfoCard } from '..'

export default function SubscribeInfo() {
  const [subData, setSubData] = useState({ end_date: '', pt_remain_count: '' })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/account/member`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          setSubData(res.data.data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  // const subData = {
  //   end_date: '2022-11-24',
  //   pt_remain_count: 11,
  // }
  return (
    <SubscribeInfoContainer>
      <SubscribeInfoCard title="회원권 잔여 일수" data={subData.end_date} />
      <SubscribeInfoCard title="PT 잔여 일수" data={subData.pt_remain_count} />
    </SubscribeInfoContainer>
  )
}

const SubscribeInfoContainer = styled.section`
  display: flex;
  width: 60vw;
  justify-content: space-between;
`
