import styled from 'styled-components'
import { useDaumPostcodePopup } from 'react-daum-postcode'

export default function SignUpFormList({
  inputFn = (e, key) => {},
  duplicateCheckHanlder = () => {},
  data = {
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    gender: '',
    height: '',
    remark: '',
    birth: '',
    profile: '',
  },
}) {
  const dataArr = Object.keys(data)

  const open = useDaumPostcodePopup()

  const handleComplete = (data) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    inputFn(fullAddress, 'address')
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  return (
    <SignUpFormListContainer>
      {dataArr.map((el) => {
        switch (el) {
          case 'profile':
            return (
              <li key={el}>
                <input type="file" onChange={(e) => inputFn(e, el)} />
              </li>
            )
          case 'address':
            return (
              <li key={el}>
                <button type="button" onClick={handleClick}>
                  Open
                </button>
              </li>
            )
          case 'email':
          case 'phone':
            return (
              <li key={el}>
                <input
                  type="text"
                  onChange={(e) => inputFn(e, el)}
                  value={data[el]}
                />
                <button onClick={() => duplicateCheckHanlder(el)}>
                  중복확인
                </button>
              </li>
            )
          default:
            return (
              <li key={el}>
                <input
                  type="text"
                  onChange={(e) => inputFn(e, el)}
                  value={data[el]}
                />
              </li>
            )
        }
      })}
    </SignUpFormListContainer>
  )
}

const SignUpFormListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`
