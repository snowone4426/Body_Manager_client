import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { loadTossPayments } from '@tosspayments/payment-sdk'

import { MembershipPriceInfo, MembershipForm } from '..'

export default function Membership() {
  const [priceInfo, setPriceInfo] = useState({ price: [], PT: [] })
  const [perchaseList, setPerchseList] = useState([])

  useEffect(() => {
    setPriceInfo({
      price: [
        {
          price_id: 1,
          price_name: '3개월권',
          price_info: 150000,
        },
      ],
      pt: [
        {
          pt_id: 1,
          trainer_name: '한태규',
          pt_price: 300000,
        },
      ],
    })
    setPerchseList([
      {
        price_id: 1,
        price_name: '3개월권',
        price_info: 150000,
      },
    ])
  }, [])

  const perchaseListAddHanlder = (perchaseNum) => {
    setPerchseList([...perchaseList, priceInfo[perchaseNum]])
  }

  const perchaseHanlder = () => {
    console.log(perchaseList)
  }

  const clickEvent = () => {
    perchaseHanlder()

    loadTossPayments(process.env.REACT_APP_CLIENTKEY).then((tossPayments) => {
      tossPayments
        .requestPayment('카드', {
          amount: 15000,
          orderId: '92TGiRz4i5cFvPoZToKMW',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: 'http://localhost:8080/success',
          failUrl: 'http://localhost:8080/fail',
        })
        .then((res) => console.log(res))
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            console.log('사용자가 결제창을 닫음')
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            console.log('유효하지 않은 키')
          }
        })
    })
  }

  return (
    <MembershipContainer>
      <FormTitle>Membership</FormTitle>
      <MembershipPriceInfo priceInfo={priceInfo.price} />
      <MembershipForm
        priceInfo={priceInfo}
        selectClickFn={perchaseListAddHanlder}
      />
      <button onClick={clickEvent}>구매</button>
    </MembershipContainer>
  )
}

const MembershipContainer = styled.div``
const FormTitle = styled.div``
