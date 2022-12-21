import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

export default function PurchaseHistory() {
  const [purchase, setPerchase] = useState({})
  const [page, setPage] = useState(0)
  useEffect(() => {
    axios 
      .post(
        `${process.env.REACT_APP_SERVER_URL}/account/list`,
        {
          page: 0,
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
    //   total_count: 9,
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

  const pageChange = (type) => {
    const limit = 10
    let nowPage = page
    if (type !== 'next' && nowPage * limit < purchase.total_count) {
      setPage(nowPage + 1)
      nowPage += 1
    }
    if (type !== 'next' && nowPage * limit >= purchase.total_count) {
      alert('마지막 페이지 입니다')
      return
    }
    if (nowPage !== 0 && type === 'next') {
      setPage(nowPage - 1)
      nowPage -= 1
    }
    if (nowPage === 0 && type === 'next') {
      alert('첫 페이지 입니다')
      return
    }
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/account/list`,
        {
          page: nowPage,
          limit: 10,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          setPerchase(res.data.data)
        }
        setPage(nowPage - 1)
        alert('다시 시도해 주세요')
      })
      .catch((err) => {
        console.log(err)
        setPage(nowPage - 1)
        alert('다시 시도해 주세요')
      })
  }

  const line = (
    <HorizontalLine>
      <RoundEnd isRight={false} />
      --------------------------------------------------------------
      <RoundEnd isRight={true} />
    </HorizontalLine>
  )

  return (
    <PurchaseHistoryContainer>
      {!!Object.keys(purchase).filter((el) => el !== 'total_count').length ? (
        <>
          <PurchaseTitle>영수증</PurchaseTitle>
          {line}
          {Object.keys(purchase)
            .filter((el) => el !== 'total_count')
            .sort()
            .reverse()
            .map((el) => (
              <PurchaseFrame key={el}>
                {purchase[el].map((data) => (
                  <>
                    <PurchaseList>
                      <ListContent>{data.sub_type}</ListContent>
                      <ListContent>
                        ₩ {data.price_info.toLocaleString()}
                      </ListContent>
                    </PurchaseList>
                    {line}
                  </>
                ))}
              </PurchaseFrame>
            ))}
          <BtnBox>
            <button onClick={() => pageChange('pre')}>
              <FaAngleLeft size={20} />
            </button>
            <button onClick={() => pageChange('next')}>
              <FaAngleRight size={20} />
            </button>
          </BtnBox>
        </>
      ) : (
        <div>데이터가 없습니다</div>
      )}
    </PurchaseHistoryContainer>
  )
}

const PurchaseHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 60%;
  border-radius: 1rem;
  padding: 1rem;
  background-color: white;
  overflow: hidden;
`

const PurchaseTitle = styled.div`
  font-size: 2rem;
`

const ListContent = styled.div`
  font-size: 1.5rem;
`

const PurchaseFrame = styled.ul``

const PurchaseList = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0 2rem;
`

const HorizontalLine = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #99aeb4d8;
`

const RoundEnd = styled.div`
  position: relative;
  right: ${({ isRight }) => (isRight ? '-2.5rem' : '2.5rem')};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #99aeb489;
`

const BtnBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 1rem;
`
