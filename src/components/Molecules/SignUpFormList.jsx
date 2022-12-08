import styled from 'styled-components'
import { useDaumPostcodePopup } from 'react-daum-postcode'

export default function SignUpFormList({
  inputFn = (e, key) => {},
  isDubplicate = {},
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
              <SignUpFormInputFrame key={el}>
                <SignUpInputLabel>
                  사진등록
                  <SighUpInput type="file" onChange={(e) => inputFn(e, el)} />
                </SignUpInputLabel>
              </SignUpFormInputFrame>
            )
          case 'address':
            return (
              <SignUpFormInputFrame key={el}>
                {data.address}
                <button type="button" onClick={handleClick}>
                  주소 찾기
                </button>
              </SignUpFormInputFrame>
            )
          case 'email':
          case 'phone':
            return (
              <SignUpFormInputFrame isDubplicate={isDubplicate} key={el}>
                {el}
                <SighUpInput
                  type="text"
                  onChange={(e) => inputFn(e, el)}
                  value={data[el]}
                />
              </SignUpFormInputFrame>
            )
          default:
            return (
              <SignUpFormInputFrame key={el}>
                {el}
                <SighUpInput
                  type="text"
                  onChange={(e) => inputFn(e, el)}
                  value={data[el]}
                />
              </SignUpFormInputFrame>
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
const SignUpFormInputFrame = styled.li`
  width: 30rem;
  height: 3rem;
  border: 1px solid black;
`

const SighUpInput = styled.input``

const SignUpInputLabel = styled.div`
  border: ${({ isDubplicate }) =>
    isDubplicate ? '1px solid red' : '1px solid black'};
`
