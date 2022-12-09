import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function PurchaseHistory() {
  const [purchase, setPerchase] = useState({})
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/account/list`,
        {
          page: 1,
          limit: 10,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          setPerchase(res.data.data)
        }
      })
    // setPerchase({
    //   '2022-11-22': [
    //     {
    //       sub_type: '3개월권',
    //       price_info: 150000,
    //     },
    //     {
    //       sub_type: 'pt n회',
    //       price_info: 150000,
    //     },
    //   ],
    // })
  }, [])

  return (
    <PurchaseHistoryContainer>
      {Object.keys(purchase).map((el) => (
        <div key={el}>
          {purchase[el].map((data) => (
            <>
              <div>{`subtype : ${data.sub_type}`}</div>
              <div>{`price_info : ${data.price_info}`}</div>
            </>
          ))}
        </div>
      ))}
    </PurchaseHistoryContainer>
  )
}

const PurchaseHistoryContainer = styled.div``
