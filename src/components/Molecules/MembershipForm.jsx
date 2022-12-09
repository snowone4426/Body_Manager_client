import styled from 'styled-components'
import { useState } from 'react'
import moment from 'moment/moment'

export default function MembershipForm({
  priceInfo = {
    price: [],
    pt: [],
  },
  selectClickFn = () => {},
  toggleFn = () => {},
}) {
  const [toggle, setToggle] = useState('membership')
  const [isDisable, setIsDisable] = useState({ cloth: false, cabinet: false })
  const [inputValue, setInputValue] = useState({ cloth: '', cabinet: '' })

  const toggleHanlder = (type) => {
    toggleFn(type)
    setToggle(type)
  }

  const membership = (
    <div>
      <p>이용권</p>
      <select onChange={(e) => selectClickFn('membership', e.target.value, 1)}>
        {priceInfo.price
          .filter((el) => el.price_id > 2)
          .map((el, idx) => (
            <option value={el.price_id} key={idx}>
              {el.price_name}
              {el.price_info}
            </option>
          ))}
      </select>
    </div>
  )

  const pt = (
    <div>
      <p>pt</p>
      <select onChange={(e) => selectClickFn('pt', e.target.value, 1)}>
        {priceInfo.pt &&
          priceInfo.pt.map((el, idx) => (
            <option value={el.pt_id} key={idx}>
              {el.trainer_name}
              {el.pt_price}
            </option>
          ))}
      </select>
    </div>
  )

  return (
    <MembershipFormContainer>
      <button onClick={() => toggleHanlder('membership')}>membership</button>
      <button onClick={() => toggleHanlder('pt')}>pt</button>
      {toggle === 'membership' ? membership : pt}
      <div>
        <p>운동복</p>
        <input
          onChange={(e) => {
            setIsDisable({ ...isDisable, cloth: e.target.checked })
            if (!e.target.checked) {
              selectClickFn('cloth', 1, '')
              setInputValue({ ...inputValue, cloth: '' })
            }
          }}
          type="checkbox"
          checked={isDisable.cloth}
        />
        <input
          type="number"
          onChange={(e) => {
            selectClickFn('cloth', 1, e.target.value)
            setInputValue({ ...inputValue, cloth: e.target.value })
          }}
          value={inputValue.cloth}
          disabled={!isDisable.cloth}
        />
        달
      </div>
      <div>
        <p>캐비넷</p>
        <input
          onChange={(e) => {
            setIsDisable({ ...isDisable, cabinet: e.target.checked })
            if (!e.target.checked) {
              selectClickFn('cabinet', 1, '')
              setInputValue({ ...inputValue, cabinet: '' })
            }
          }}
          type="checkbox"
          checked={isDisable.cabinet}
        />
        <input
          type="number"
          onChange={(e) => {
            selectClickFn('cabinet', 2, e.target.value)
            setInputValue({ ...inputValue, cabinet: e.target.value })
          }}
          value={inputValue.cabinet}
          disabled={!isDisable.cabinet}
        />
        달
      </div>
    </MembershipFormContainer>
  )
}

const MembershipFormContainer = styled.div``

// 이용권 구매
//  - 이용권 항목에서 선택
// 운동복 빌림 여부
//  - 체크박스 선택, 기간 선택
// 캐비넷 구매 여부
//  - 체크박스 선택, 기간 선택.
