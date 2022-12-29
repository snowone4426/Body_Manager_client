import axios from 'axios'
import moment from 'moment/moment'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadTossPayments } from '@tosspayments/payment-sdk'

import { MembershipPriceInfo, MembershipForm } from '..'

export default function Membership() {
  const userName = useSelector((state) => state.auth.name)
  const [priceInfo, setPriceInfo] = useState({ price: [], PT: [] })
  const [perchaseList, setPerchseList] = useState([])

  useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}/account/price`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     if (res.data.message === 'ok') {
    //       setPriceInfo(res.data.data)
    //       setPerchseList([
    //         {
    //           id: res.data.data.price[2].price_id,
    //           type: 'price',
    //           count: 1,
    //           start: moment(new Date()).format('YYYY-MM_DD'),
    //         },
    //       ])
    //     }
    //   })
    //   .catch((err) => console.log(err))
    setPriceInfo({
      price: [
        {
          price_id: 1,
          price_name: '운동복',
          price_info: 10000,
        },
        {
          price_id: 2,
          price_name: '케비넷',
          price_info: 10000,
        },
        {
          price_id: 3,
          price_name: '3개월권',
          price_info: 150000,
        },
        {
          price_id: 4,
          price_name: '6개월권',
          price_info: 300000,
        },
      ],
      PT: [
        {
          pt_id: 1,
          trainer_name: '한태규',
          pt_price: 300000,
        },
      ],
    })
    setPerchseList([
      {
        id: '3',
        type: 'price',
        count: 1,
        start: moment(new Date()).format('YYYY-MM_DD'),
      },
    ])
  }, [])

  const totalPriceCalc = (arr) => {
    let result = 0
    arr.forEach((el) => {
      if (el.type === 'pt') {
        // console.log(priceInfo.PT.filter((ele) => ele.pt_id === el.id)[0].pt_price)
        // console.log(el.count)
        result +=
          priceInfo.PT.filter((ele) => ele.pt_id === el.id)[0].pt_price *
          el.count
        return
      }
      result +=
        priceInfo.price.filter(
          (ele) => Number(ele.price_id) === Number(el.id),
        )[0].price_info * el.count
    })

    return result
  }

  const toggleFn = (type) => {
    const list = [...perchaseList]

    if (type === 'membership') {
      const filterList = list.filter((el) => el.type === 'price')
      if (filterList.filter((el) => el.price_id > 2).length === 0) {
        filterList.unshift({
          id: priceInfo.price[2].price_id,
          type: 'price',
          count: 1,
          start: moment(new Date()).format('YYYY-MM-DD'),
        })
        setPerchseList(filterList)
      }
    } else {
      const filterList = list.filter(
        (el) => (el.type === 'price' && el.id < 3) || el.type === 'pt',
      )
      if (filterList.filter((el) => el.price_id > 2).length === 0) {
        filterList.unshift({
          id: priceInfo.PT[0].pt_id,
          type: 'pt',
          count: 1,
          start: moment(new Date()).format('YYYY-MM-DD'),
        })
      }
      setPerchseList(filterList)
    }
  }

  const perchaseListAddHanlder = (
    type,
    perchaseNum,
    value,
    date = moment(new Date()).format('YYYY-MM-DD'),
  ) => {
    const perchaseCopy = [...perchaseList]
    switch (type) {
      case 'membership':
        const membershipObj = perchaseCopy[0]
        membershipObj.id = perchaseNum
        membershipObj.start = date
        setPerchseList(perchaseCopy)
        return
      case 'pt':
        const ptObj = perchaseCopy[0]
        ptObj.id = perchaseNum
        ptObj.count = value
        ptObj.start = date
        setPerchseList(perchaseCopy)
        return
      case 'cloth':
        const emptyClothArr = perchaseCopy.filter((el) => el.id !== 1)
        if (value) {
          emptyClothArr.push({
            id: perchaseNum,
            type: 'price',
            count: value,
            start: date,
          })
        }
        setPerchseList(emptyClothArr)
        return
      case 'cabinet':
        const emptyCabinetArr = perchaseCopy.filter((el) => el.id !== 2)
        if (value) {
          emptyCabinetArr.push({
            id: perchaseNum,
            type: 'price',
            count: value,
            start: date,
          })
        }
        setPerchseList(emptyCabinetArr)
        return
      default:
        return
    }
  }

  const clickEvent = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/account/order`,
        { order_list: perchaseList },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          loadTossPayments('test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq').then(
            (tossPayments) => {
              tossPayments
                .requestPayment('카드', {
                  amount: totalPriceCalc(perchaseList),
                  orderId: '92TGiRz4i5cFvPoZToKMW',
                  orderName: '채육관 상품',
                  customerName: userName,
                  successUrl: `${process.env.REACT_APP_CLIENT_URL}/account`,
                  // failUrl: `${process.env.REACT_APP_CLIENT_URL}/account`,
                })
                .catch((error) => {
                  if (error.code === 'USER_CANCEL') {
                    console.log('사용자가 결제창을 닫음')
                  } else if (error.code === 'INVALID_CARD_COMPANY') {
                    alert('결제가 취소되었습니다.')
                  }
                })
            },
          )
        }
      })
      .catch((err) => {
        console.log(err)
        alert('다시 시도해 주세요')
      })
  }

  return (
    <MembershipContainer>
      <MembershipPriceInfo priceInfo={priceInfo.price} />
      <MembershipForm
        priceInfo={priceInfo}
        selectClickFn={perchaseListAddHanlder}
        toggleFn={toggleFn}
        clickEvent={clickEvent}
      />
    </MembershipContainer>
  )
}

const MembershipContainer = styled.div`
  display: flex;
  align-items: center;
`
