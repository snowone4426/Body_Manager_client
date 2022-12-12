import styled from 'styled-components'
import { useState } from 'react'

export default function MembershipForm({
  priceInfo = {
    price: [],
    PT: [],
  },
  selectClickFn = () => {},
  toggleFn = () => {},
  clickEvent = () => {},
}) {
  const [toggle, setToggle] = useState('membership')
  const [isDisable, setIsDisable] = useState({ cloth: false, cabinet: false })
  const [inputValue, setInputValue] = useState({ cloth: '', cabinet: '' })

  const toggleHanlder = (type) => {
    toggleFn(type)
    setToggle(type)
  }

  const membership = (
    <MembershipFormList>
      <MembershipTitle>이용권</MembershipTitle>
      <MembershipFormSelect
        onChange={(e) => selectClickFn('membership', e.target.value, 1)}
      >
        {priceInfo.price
          .filter((el) => el.price_id > 2)
          .map((el, idx) => (
            <option value={el.price_id} key={idx}>
              {el.price_name}
              {el.price_info}
            </option>
          ))}
      </MembershipFormSelect>
    </MembershipFormList>
  )

  const pt = (
    <MembershipFormList>
      <MembershipTitle>PT</MembershipTitle>
      <MembershipFormSelect
        onChange={(e) => selectClickFn('pt', e.target.value, 1)}
      >
        {priceInfo.PT &&
          priceInfo.PT.map((el, idx) => (
            <option value={el.pt_id} key={idx}>
              {el.trainer_name}
              {el.pt_price}
            </option>
          ))}
      </MembershipFormSelect>
    </MembershipFormList>
  )

  return (
    <MembershipFormContainer>
      <ToggleBtn onClick={() => toggleHanlder('membership')}>
        Membership
      </ToggleBtn>
      <ToggleBtn onClick={() => toggleHanlder('PT')}>PT</ToggleBtn>
      <MembershipFormFrame>
        {toggle === 'membership' ? membership : pt}
        <MembershipFormList>
          <AddCheckbox
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
          <MembershipLabel>
            <MembershipTitle>운동복</MembershipTitle>
            <MembershipInput
              type="number"
              onChange={(e) => {
                selectClickFn('cloth', 1, e.target.value)
                setInputValue({ ...inputValue, cloth: e.target.value })
              }}
              value={inputValue.cloth}
              disabled={!isDisable.cloth}
            />
            달
          </MembershipLabel>
        </MembershipFormList>
        <MembershipFormList>
          <AddCheckbox
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
          <MembershipLabel>
            <MembershipTitle>캐비넷</MembershipTitle>
            <MembershipInput
              type="number"
              onChange={(e) => {
                selectClickFn('cabinet', 2, e.target.value)
                setInputValue({ ...inputValue, cabinet: e.target.value })
              }}
              value={inputValue.cabinet}
              disabled={!isDisable.cabinet}
            />
            달
          </MembershipLabel>
        </MembershipFormList>
      </MembershipFormFrame>
      <SubmitBtn onClick={clickEvent}>구매</SubmitBtn>
    </MembershipFormContainer>
  )
}

const MembershipFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 1rem;
  margin: 4rem;
  padding: 1rem;
`

const MembershipFormFrame = styled.ul``

const MembershipFormList = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`

const MembershipLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  cursor: text;
`

const ToggleBtn = styled.button`
  border-radius: 0.6rem;
  margin: 0.2rem;
  padding: 0.4rem;
  background-color: #ebebeb;
`

const MembershipFormSelect = styled.select`
  border-radius: 0.3rem;
  background-color: #ececec;
`

const MembershipTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0.3rem;
`

const AddCheckbox = styled.input``

const MembershipInput = styled.input`
  text-align: end;
  padding-right: 0.3rem;
`

const SubmitBtn = styled.button`
  font-size: 1.2rem;
`
